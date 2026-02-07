import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueHeaderComponent } from '../../components/queue-header/queue-header';
import { HeroSectionComponent } from '../../components/hero-section/hero-section';
import { ProgressCardComponent } from '../../components/progress-card/progress-card';
import { StatsGridComponent } from '../../components/stats-grid/stats-grid';
import { InfoBoxComponent } from '../../components/info-box/info-box';
import { QueueService } from '../../../../core/services/queue.service';

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
    this.queueService.queueJoin().subscribe((response) => {
      console.log(response);
      localStorage.setItem('userId', response.userId);

    });
  }
}
