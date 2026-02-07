import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TicketType {
  id: string;
  title: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.css',
})
export class TicketCardComponent {

  @Input({ required: true }) ticket!: TicketType;
  @Input() maxQuantity = 6;
  @Output() quantityChange = new EventEmitter<number>();

  quantity = signal<number>(0);

  increment() {
    if (this.quantity() < this.maxQuantity) {
      this.quantity.update((q) => q + 1);
      this.quantityChange.emit(this.quantity());
    }
  }

  decrement() {
    if (this.quantity() > 0) {
      this.quantity.update((q) => q - 1);
      this.quantityChange.emit(this.quantity());
    }
  }
}
