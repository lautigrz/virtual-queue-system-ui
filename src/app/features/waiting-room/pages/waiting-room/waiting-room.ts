import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header';
import { FooterComponent } from '../../../../shared/components/footer/footer';
import { StatusChipComponent } from '../../components/status-chip/status-chip';
import { EventCardComponent } from '../../components/event-card/event-card';
import { InfoGridComponent } from '../../components/info-grid/info-grid';

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
  templateUrl: './waiting-room.html',
  styles: ``
})
export class WaitingRoomPageComponent { }
