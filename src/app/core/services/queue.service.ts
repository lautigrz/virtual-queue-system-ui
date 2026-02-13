import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpirationService } from './expiration.service';
import { Router } from '@angular/router';

interface QueueStatusResponse {
    status: string;
    position: number;
    queueSize: number;
    ahead: number;
    progress: number;
}

interface QueueRedirectResponse {
    userId: string;
    redirect: string;
    expiration: number;
}


interface QueueViewModel {
    position: number;
    totalUsers: number;
    usersAhead: number;
    progress: number;
}

interface QueueJoinResponse {
    message: string;
    userId: string;
}

type QueueStatus = QueueStatusResponse & QueueRedirectResponse;

@Injectable({
    providedIn: 'root'
})

export class QueueService {

    private httpClient = inject(HttpClient);
    private apiBaseUrl = 'http://localhost:3000';
    private expirationService = inject(ExpirationService);
    private router = inject(Router);
    private queueStatusSignal = signal<QueueViewModel>({
        position: 0,
        totalUsers: 0,
        usersAhead: 0,
        progress: 0
    });

    private userId = signal<string | null>(null);

    private initialAhead = signal<number | null>(null);

    private pollingActive = signal(false);

    constructor() {

        const userId = localStorage.getItem('userId');
        if (userId) {
            this.setUserId(userId);
        }

        effect((onCleanup) => {
            if (!this.userId() || !this.pollingActive()) return;

            const interval = setInterval(() => {
                this.loadQueueStatus();
            }, 3000)

            onCleanup(() => {
                clearInterval(interval);
            })

        })
    }


    queueStatus = this.queueStatusSignal.asReadonly();

    startPolling() {
        this.pollingActive.set(true);
        this.loadQueueStatus();
    }

    stopPolling() {
        this.pollingActive.set(false);
    }

    setUserId(userId: string) {
        this.userId.set(userId);
    }

    queueJoin(): Observable<QueueJoinResponse> {
        const userId = localStorage.getItem('userId');
        const body = userId ? { userId } : {};
        return this.httpClient.post<QueueJoinResponse>(`${this.apiBaseUrl}/queue/join`, body);
    }

    loadQueueStatus() {
        const userId = this.userId();

        if (!userId) return;
        this.httpClient
            .get<QueueStatus>(`${this.apiBaseUrl}/queue/status/${userId}`)
            .subscribe(res => {
                if (this.initialAhead() === null) {
                    this.initialAhead.set(res.ahead);
                }
                console.log(res);
                if (res.redirect) {
                    console.log(res.expiration);
                    this.expirationService.start(res.expiration);
                    this.router.navigate([res.redirect]);

                }

                this.queueStatusSignal.set({
                    position: res.position,
                    totalUsers: res.queueSize,
                    usersAhead: res.ahead,
                    progress: res.progress
                });
            });
    }

}
