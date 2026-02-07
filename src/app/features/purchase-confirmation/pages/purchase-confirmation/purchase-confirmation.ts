import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationCard } from '../../components/confirmation-card/confirmation-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-purchase-confirmation',
  standalone: true,
  imports: [CommonModule, ConfirmationCard, RouterLink],
  templateUrl: './purchase-confirmation.html',
  styleUrl: './purchase-confirmation.css'
})
export class PurchaseConfirmation {

}
