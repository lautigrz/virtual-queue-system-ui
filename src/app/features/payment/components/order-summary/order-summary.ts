import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpirationTimerComponent } from '../../../ticket-selection/components/expiration-timer/expiration-timer';
import { SelectedTicket } from '../../../ticket-selection/components/order-summary/order-summary';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, ExpirationTimerComponent],
  templateUrl: './order-summary.html'
})
export class OrderSummaryComponent {
  @Input() items: SelectedTicket[] = [];

  get total(): number {
    return this.items.reduce((acc, item) => acc + (item.ticket.price * item.quantity), 0);
  }
}
