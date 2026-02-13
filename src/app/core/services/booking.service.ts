import { Injectable, signal } from '@angular/core';
import { SelectedTicket } from '../../features/ticket-selection/components/order-summary/order-summary';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private selectedTicketsSignal = signal<SelectedTicket[]>([]);

    readonly selectedTickets = this.selectedTicketsSignal.asReadonly();

    updateTickets(tickets: SelectedTicket[]) {
        this.selectedTicketsSignal.set(tickets);
    }

    getTickets(): SelectedTicket[] {
        return this.selectedTicketsSignal();
    }

    clearTickets() {
        this.selectedTicketsSignal.set([]);
    }
}
