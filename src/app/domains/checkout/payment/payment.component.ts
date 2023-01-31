import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  private builder = inject(NonNullableFormBuilder);

  blikForm = this.builder.group({
    blikNum: this.builder.control(123456, {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
}
