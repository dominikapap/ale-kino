import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/core/user-state.service';
import { CheckoutForm } from '../../interfaces/CheckoutForm';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  private builder = inject(NonNullableFormBuilder);
  userName = inject(UserStateService).getUserName();
  checkoutForm = this.createCheckoutForm();

  ngOnInit() {
    this.checkoutForm.controls.firstName.setValue(this.userName);
  }

  sendForm() {
    this.checkoutForm.markAllAsTouched();

    if (this.checkoutForm.invalid) {
      alert('Nie wypełniono formularza');
    }
    console.log(this.checkoutForm.value);
  }

  private createCheckoutForm(): CheckoutForm {
    const form = this.builder.group({
      firstName: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      lastName: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      phoneNumber: this.builder.control('', {
        validators: [Validators.minLength(9)],
      }),
      email: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),
      confirmEmail: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),
      newsletter: this.builder.control(false),
      couponCode: this.builder.control('', {
        validators: [Validators.minLength(5)],
      }),
    });
    return form;
  }
}
