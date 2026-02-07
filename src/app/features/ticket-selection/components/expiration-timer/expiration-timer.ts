import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expiration-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expiration-timer.html',
  styleUrl: './expiration-timer.css',
})
export class ExpirationTimerComponent implements OnInit {


  initialSeconds = input<number>(600);

  private remainingSeconds = signal<number>(0);
  private destroyRef = inject(DestroyRef);

  minutes = computed(() => Math.floor(this.remainingSeconds() / 60));
  seconds = computed(() => this.remainingSeconds() % 60);

  ngOnInit() {
    this.remainingSeconds.set(this.initialSeconds());

    const intervalId = setInterval(() => {
      this.remainingSeconds.update((s) => Math.max(0, s - 1));
    }, 1000);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });
  }
}
