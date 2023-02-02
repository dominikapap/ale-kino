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
    blikNum: this.builder.control(null, {
      validators: [Validators.required, Validators.pattern('[0-9]{6}')],
    }),
  });
}
