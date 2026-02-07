import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHeaderComponent } from '../../components/purchase-header/purchase-header';
import { PurchaseCardComponent } from '../../components/purchase-card/purchase-card';

@Component({
  selector: 'app-purchase-access',
  standalone: true,
  imports: [
    CommonModule,
    PurchaseHeaderComponent,
    PurchaseCardComponent
  ],
  templateUrl: './purchase-access.html',
  styles: ``
})
export class PurchaseAccessPageComponent { }
