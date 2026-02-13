import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-card.html',
  styles: [`
    .perspective-1000 { perspective: 1000px; }
    .preserve-3d { transform-style: preserve-3d; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .backface-hidden { backface-visibility: hidden; }
    .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
  `]
})
export class CreditCardComponent {
  @Input() cardNumber = '';
  @Input() cardName = '';
  @Input() expiryDate = '';
  @Input() cvc = '';
  @Input() isFlipped = false;
}
