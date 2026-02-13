import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ExpirationService {

  private now = signal<number>(Date.now());
  private expiresAt = signal<number | null>(null);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor() {
    const intervalId = setInterval(() => {
      this.now.set(Date.now());
    }, 1000);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });

    effect(() => {
      const expiresAt = this.expiresAt();
      if (!expiresAt) return;

      if (this.now() > expiresAt) {
        this.handleExpiration();
      }
    })

  }

  start(expiresAt: number) {
    this.expiresAt.set(expiresAt);
  }

  private handleExpiration() {
    this.expiresAt.set(null);
    this.router.navigate(['/queue']);
  }

  timeLeftSeconds = computed(() => {
    const exp = this.expiresAt();
    if (!exp) return 0;
    return Math.max(0, Math.floor((exp - this.now()) / 1000));
  });

  minutes = computed(() =>
    Math.floor(this.timeLeftSeconds() / 60)
  );

  seconds = computed(() =>
    this.timeLeftSeconds() % 60
  );
}
