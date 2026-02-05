import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { StatusChipComponent } from '../../components/status-chip/status-chip.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { InfoGridComponent } from '../../components/info-grid/info-grid.component';

@Component({
  selector: 'app-waiting-room-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    StatusChipComponent,
    EventCardComponent,
    InfoGridComponent
  ],
  templateUrl: './waiting-room.component.html',
  styles: ``
})
export class WaitingRoomPageComponent { }
