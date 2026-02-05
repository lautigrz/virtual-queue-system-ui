import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../../../core/services/queue.service';


@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-card.component.html',
  styles: ``
})
export class ProgressCardComponent implements OnInit {
  private queueService = inject(QueueService);

  queueStatus = this.queueService.queueStatus;

  ngOnInit(): void {
    console.log(this.queueStatus().progress);
  }
}
