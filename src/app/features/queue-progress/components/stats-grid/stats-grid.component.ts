import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../../../core/services/queue.service';

@Component({
  selector: 'app-stats-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-grid.component.html',
  styles: ``
})
export class StatsGridComponent implements OnInit {
  queueService = inject(QueueService);

  ngOnInit(): void {
    this.queueService.startPolling();
  }

  ngOnDestroy(): void {
    this.queueService.stopPolling();
  }
}
