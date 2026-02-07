import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../../core/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.html',
  styles: ``
})
export class EventCardComponent implements OnInit {
  private eventService = inject(EventService);
  private now = signal<number>(Date.now());
  private router = inject(Router);
  private refreshing = false;

  private destroyRef = inject(DestroyRef);
  constructor() {
    const intervalId = setInterval(() => {
      this.now.set(Date.now())
    }, 1000)

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });

    effect(() => {
      const state = this.eventService.openState();
      const timeLeft = this.timeLeftMs();

      if (!state) return;

      if (!state.isOpen && timeLeft === 0 && !this.refreshing) {
        this.refreshing = true;
        this.eventService.loadStatus();
      }

      if (state.isOpen && state.redirect) {
        this.router.navigate([state.redirect]);
      }
    });

  }

  ngOnInit(): void {
    this.eventService.loadStatus();
  }




  timeLeftMs = computed(() => {
    const state = this.eventService.openState();
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

  redirectUrl = computed(() => {
    const state = this.eventService.openState();
    return state?.isOpen ? state.redirect : null;
  });

}
