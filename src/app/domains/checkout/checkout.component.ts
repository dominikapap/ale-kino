import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/core/user.state.service';
import { User } from 'src/app/core/User.interface';
import { CheckoutForm } from '../../interfaces/CheckoutForm';
import { confirmEmailValidator } from './confirmEmailValidator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  private builder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  user = inject(UserStateService).getUserInfo();
  checkoutForm = this.createCheckoutForm();

  ngOnInit() {
    if (this.user.userID > 0) {
      this.fillForm(this.user);
    }
  }

  get checkoutFormCtrls() {
    return this.checkoutForm.controls;
  }
  fillForm(user: User) {
    this.checkoutFormCtrls.firstName.setValue(user.firstName);
    this.checkoutFormCtrls.lastName.setValue(user.lastName);
    this.checkoutFormCtrls.phoneNumber.setValue(user.phoneNumber);
    this.checkoutFormCtrls.email.setValue(user.email);
    this.checkoutFormCtrls.confirmEmail.setValue(user.email);
  }

  sendForm() {
    this.checkoutForm.markAllAsTouched();

    if (this.checkoutForm.invalid) {
      alert('Niepoprawnie wypełniony formularz');
    } else {
      console.log(this.checkoutForm.value);
      this.router.navigate(['zamowienie/platnosc']);
    }
  }

  private createCheckoutForm(): CheckoutForm {
    const form = this.builder.group({
      firstName: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      lastName: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      phoneNumber: this.builder.control(null as unknown as number, {
        validators: [Validators.required, Validators.pattern(/^\d{9}$/)],
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
          confirmEmailValidator('email'),
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
