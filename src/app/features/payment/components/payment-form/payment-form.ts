import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardComponent } from '../credit-card/credit-card';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CreditCardComponent],
  templateUrl: './payment-form.html'
})
export class PaymentFormComponent {
  @Input() total = 0;
  @Input() isProcessing = false;
  @Output() pay = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  isFlipped = signal(false);

  paymentForm: FormGroup = this.fb.group({
    cardName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
  });

  flipCard(flip: boolean) {
    this.isFlipped.set(flip);
  }

  submitPayment() {
    if (this.paymentForm.valid) {
      this.pay.emit();
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }
}
