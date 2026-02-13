import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueHeaderComponent } from '../../components/queue-header/queue-header';
import { HeroSectionComponent } from '../../components/hero-section/hero-section';
import { ProgressCardComponent } from '../../components/progress-card/progress-card';
import { StatsGridComponent } from '../../components/stats-grid/stats-grid';
import { InfoBoxComponent } from '../../components/info-box/info-box';
import { QueueService } from '../../../../core/services/queue.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-queue-progress',
  standalone: true,
  imports: [
    CommonModule,
    QueueHeaderComponent,
    HeroSectionComponent,
    ProgressCardComponent,
    StatsGridComponent,
    InfoBoxComponent
  ],
  templateUrl: './queue-progress.html',
  styles: ``
})
export class QueueProgressComponent implements OnInit {
  queueService = inject(QueueService);

  ngOnInit(): void {
    this.queueService.queueJoin().pipe(
      tap(res => {
        this.queueService.setUserId(res.userId);
        localStorage.setItem('userId', res.userId);
      })
    ).subscribe(() => {
      this.queueService.startPolling();
    });
  }
}
