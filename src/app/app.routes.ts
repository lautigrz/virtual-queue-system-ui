import { Routes } from '@angular/router';
import { WaitingRoomPageComponent } from './features/waiting-room/pages/waiting-room/waiting-room.component';
import { QueueProgressComponent } from './features/queue-progress/pages/queue-progress/queue-progress.component';
import { PurchaseAccessPageComponent } from './features/purchase-access/pages/purchase-access/purchase-access.component';

export const routes: Routes = [
    { path: '', redirectTo: 'waiting-room', pathMatch: 'full' },
    { path: 'waiting-room', component: WaitingRoomPageComponent },
    { path: 'queue', component: QueueProgressComponent },
    { path: 'purchase', component: PurchaseAccessPageComponent }
];
