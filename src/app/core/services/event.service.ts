import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

type OpenStatusResponse =
  | { isOpen: false; openTime: number }
  | { isOpen: true; redirect: string };


@Injectable({
  providedIn: 'root',
})
export class EventService {

  private httpClient = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000';

  openState = signal<OpenStatusResponse | null>(null);

  constructor() {

  }

  loadStatus() {
    this.httpClient.get<OpenStatusResponse>(`${this.apiBaseUrl}/event/open-status`)
      .subscribe(res => {
        this.openState.set(res);
      })
  }


}
