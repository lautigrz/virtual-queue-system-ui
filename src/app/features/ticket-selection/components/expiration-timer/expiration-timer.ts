import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpirationService } from '../../../../core/services/expiration.service';

@Component({
  selector: 'app-expiration-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expiration-timer.html',
  styleUrl: './expiration-timer.css',
})
export class ExpirationTimerComponent {

  private expirationService = inject(ExpirationService);

  minutes = computed(() => this.expirationService.minutes());
  seconds = computed(() => this.expirationService.seconds());

}
