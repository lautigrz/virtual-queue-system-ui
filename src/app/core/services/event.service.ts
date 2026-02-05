import { HttpClient } from '@angular/common/http';
import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type OpenStatusResponse =
  | { isOpen: false; openTime: number }
  | { isOpen: true; redirect: string };


@Injectable({
  providedIn: 'root',
})
export class EventService {

  private httpClient = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000';

  private openState = signal<OpenStatusResponse | null>(null);
  private now = signal<number>(Date.now());
  private destroyRef = inject(DestroyRef);
  readonly openState$ = this.openState.asReadonly();

  constructor() {
    const intervalId = setInterval(() => {
      this.now.set(Date.now())
    }, 1000)

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });

    effect(() => {
      const state = this.openState();
      const timeLeft = this.timeLeftMs();

      if (!state || state.isOpen) return;

      if (timeLeft === 0) {
        this.loadStatus();
      }
    });
  }

  loadStatus() {
    this.httpClient.get<OpenStatusResponse>(`${this.apiBaseUrl}/event/open-status`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        console.log(res);
        this.openState.set(res);
      })
  }

  timeLeftMs = computed(() => {
    const state = this.openState();
    if (!state || state.isOpen) return 0;

    return Math.max(0, state.openTime - this.now());
  });

  timeLeftSeconds = computed(() =>
    Math.ceil(this.timeLeftMs() / 1000)
  );


  hours = computed(() => {
    const totalSeconds = Math.floor(this.timeLeftMs() / 1000);
    return Math.floor(totalSeconds / 3600);
  });

  minutes = computed(() => {
    const totalSeconds = Math.floor(this.timeLeftMs() / 1000);
    return Math.floor((totalSeconds % 3600) / 60);
  });

  seconds = computed(() => {
    const totalSeconds = Math.floor(this.timeLeftMs() / 1000);
    return totalSeconds % 60;
  });








  isCountingDown = computed(() => {
    const state = this.openState();
    return !!state && !state.isOpen;
  });

  redirectUrl = computed(() => {
    const state = this.openState();
    return state?.isOpen ? state.redirect : null;
  });
}
