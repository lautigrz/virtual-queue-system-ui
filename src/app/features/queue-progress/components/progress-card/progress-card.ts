import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../../../core/services/queue.service';


@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-card.html',
  styles: ``
})
export class ProgressCardComponent implements OnDestroy {
  private queueService = inject(QueueService);

  queueStatus = this.queueService.queueStatus;

  ngOnDestroy(): void {
    this.queueService.stopPolling();
  }
}
