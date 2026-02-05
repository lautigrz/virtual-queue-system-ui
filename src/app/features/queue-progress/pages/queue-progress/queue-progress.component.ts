import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueHeaderComponent } from '../../components/queue-header/queue-header.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ProgressCardComponent } from '../../components/progress-card/progress-card.component';
import { StatsGridComponent } from '../../components/stats-grid/stats-grid.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
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
  templateUrl: './queue-progress.component.html',
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
