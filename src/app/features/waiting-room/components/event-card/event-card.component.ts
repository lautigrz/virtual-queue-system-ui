import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../../../core/services/queue.service';
import { Observable, map } from 'rxjs';
import { EventService } from '../../../../core/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styles: ``
})
export class EventCardComponent {
  eventService = inject(EventService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const redirectUrl = this.eventService.redirectUrl();
      if (redirectUrl) {
        this.router.navigate([redirectUrl]);
      }
    })

    this.eventService.loadStatus();
  }



}
