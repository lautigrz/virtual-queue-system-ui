import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketType } from '../ticket-card/ticket-card';

export interface SelectedTicket {
  ticket: TicketType;
  quantity: number;
}

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummaryComponent {

  @Input({ required: true }) set selectedTickets(value: SelectedTicket[]) {
    this._selectedTickets.set(value);
  }
  @Output() checkout = new EventEmitter<void>();

  private _selectedTickets = signal<SelectedTicket[]>([]);

  tickets = this._selectedTickets.asReadonly();

  total = computed(() => {
    return this._selectedTickets().reduce((acc, item) => acc + (item.ticket.price * item.quantity), 0);
  });

  itemCount = computed(() => {
    return this._selectedTickets().reduce((acc, item) => acc + item.quantity, 0);
  });

  onCheckout() {
    this.checkout.emit();
  }
}
