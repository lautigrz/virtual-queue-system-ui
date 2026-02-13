import { Routes } from '@angular/router';
import { WaitingRoomPageComponent } from './features/waiting-room/pages/waiting-room/waiting-room';
import { QueueProgressComponent } from './features/queue-progress/pages/queue-progress/queue-progress';
import { PurchaseAccessPageComponent } from './features/purchase-access/pages/purchase-access/purchase-access';

export const routes: Routes = [
    { path: '', redirectTo: 'waiting-room', pathMatch: 'full' },
    { path: 'waiting-room', component: WaitingRoomPageComponent },
    { path: 'queue', component: QueueProgressComponent },
    { path: 'purchase', component: PurchaseAccessPageComponent },
    {
        path: 'ticket-selection',
        loadComponent: () => import('./features/ticket-selection/pages/ticket-selection/ticket-selection').then(m => m.TicketSelectionComponent)
    },
    {
        path: 'payment',
        loadComponent: () => import('./features/payment/pages/payment/payment').then(m => m.PaymentComponent)
    },
    {
        path: 'confirmation',
        loadComponent: () => import('./features/purchase-confirmation/pages/purchase-confirmation/purchase-confirmation').then(m => m.PurchaseConfirmation)
    }
];


