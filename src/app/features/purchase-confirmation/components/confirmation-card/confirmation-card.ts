import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-card.html',
  styleUrl: './confirmation-card.css'
})
export class ConfirmationCard {
  @Input() eventName = 'Afterlife: Buenos Aires 2024';
  @Input() eventDate = 'Sábado, 15 de Octubre';
  @Input() eventTime = '22:00h - Puertas 20:00h';
  @Input() eventLocation = 'Hipódromo de Palermo';
  @Input() eventAddress = 'Av. del Libertador 4101, CABA';
  @Input() ticketType = 'General Standing';
  @Input() ticketQuantity = 2;
  @Input() ticketAccess = 'Acceso a Campo General';
  @Input() locator = '#TX-99821-B'; // This would typically come from an order ID
}
