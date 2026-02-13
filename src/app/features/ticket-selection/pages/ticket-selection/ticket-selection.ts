import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../../../core/services/booking.service';
import { CommonModule } from '@angular/common';
import { ExpirationTimerComponent } from '../../components/expiration-timer/expiration-timer';
import { TicketCardComponent, TicketType } from '../../components/ticket-card/ticket-card';
import { OrderSummaryComponent, SelectedTicket } from '../../components/order-summary/order-summary';

@Component({
  selector: 'app-ticket-selection',
  standalone: true,
  imports: [CommonModule, ExpirationTimerComponent, TicketCardComponent, OrderSummaryComponent],
  templateUrl: './ticket-selection.html',
  styleUrl: './ticket-selection.css',
})
export class TicketSelectionComponent {

  availableTickets: TicketType[] = [
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Precio especial por tiempo limitado.',
      price: 45
    },
    {
      id: 'general',
      title: 'Entrada General',
      description: 'Acceso estándar al recinto y todas las áreas comunes.',
      price: 60
    },
    {
      id: 'vip',
      title: 'Entrada VIP',
      description: 'Acceso prioritario, zona exclusiva y barra privada.',
      price: 120
    }
  ];

  selectedTickets = signal<SelectedTicket[]>([]);

  private bookingService = inject(BookingService);
  private router = inject(Router);

  onQuantityChange(ticket: TicketType, quantity: number) {
    this.selectedTickets.update((current) => {
      const existingRequest = current.find((item) => item.ticket.id === ticket.id);

      if (quantity === 0) {
        return current.filter((item) => item.ticket.id !== ticket.id);
      }

      if (existingRequest) {
        return current.map((item) =>
          item.ticket.id === ticket.id ? { ...item, quantity } : item
        );
      }

      return [...current, { ticket, quantity }];
    });
  }

  onCheckout() {
    console.log('Procesando compra:', this.selectedTickets());
    this.bookingService.updateTickets(this.selectedTickets());
    this.router.navigate(['/payment']);
  }
}
