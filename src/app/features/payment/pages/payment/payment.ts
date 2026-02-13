import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../../core/services/booking.service';
import { ExpirationService } from '../../../../core/services/expiration.service';
import { Router } from '@angular/router';
import { PaymentLayoutComponent } from '../../components/payment-layout/payment-layout';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary';
import { PaymentFormComponent } from '../../components/payment-form/payment-form';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [
        CommonModule,
        PaymentLayoutComponent,
        OrderSummaryComponent,
        PaymentFormComponent
    ],
    templateUrl: './payment.html',
    styleUrl: './payment.css',
})
export class PaymentComponent implements OnInit {
    private bookingService = inject(BookingService);
    private expirationService = inject(ExpirationService);
    private router = inject(Router);

    selectedTickets = computed(() => this.bookingService.selectedTickets());

    isProcessing = signal(false);

    total = computed(() => {
        return this.selectedTickets().reduce((acc, item) => acc + (item.ticket.price * item.quantity), 0);
    });

    ngOnInit() {
        if (this.selectedTickets().length === 0) {
            this.router.navigate(['/ticket-selection']);
        }
    }

    handlePayment() {
        this.isProcessing.set(true);

        // Simular proceso de pago
        setTimeout(() => {
            console.log('Pago procesado para:', this.selectedTickets());
            this.bookingService.clearTickets();
            this.router.navigate(['/confirmation']);
            this.isProcessing.set(false);
        }, 2000);
    }
}
