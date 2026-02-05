import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHeaderComponent } from '../../components/purchase-header/purchase-header.component';
import { PurchaseCardComponent } from '../../components/purchase-card/purchase-card.component';

@Component({
  selector: 'app-purchase-access',
  standalone: true,
  imports: [
    CommonModule,
    PurchaseHeaderComponent,
    PurchaseCardComponent
  ],
  templateUrl: './purchase-access.component.html',
  styles: ``
})
export class PurchaseAccessPageComponent { }
