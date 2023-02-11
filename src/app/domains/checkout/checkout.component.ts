import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/core/user.state.service';
import { User } from 'src/app/core/User.interface';
import { CheckoutForm } from '../../shared/interfaces/CheckoutForm';
import { confirmEmailValidator } from './confirmEmailValidator';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  private builder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  user = inject(UserStateService).getUserInfo();
  checkoutForm = this.createCheckoutForm();
  checkoutCouponRate = 1;

  ngOnInit() {
    if (this.user.userID > 0) {
      this.fillForm(this.user);
    }

    this.couponValue();
  }

  get checkoutFormCtrls() {
    return this.checkoutForm.controls;
  }

  get couponCodeCtrl() {
    return this.checkoutForm.controls.couponCode;
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
      this.router.navigate(['zamowienie/platnosc']);
    }
  }

  couponValue() {
    return this.couponCodeCtrl.statusChanges.subscribe(() =>
      this.couponCodeCtrl.valid
        ? (this.checkoutCouponRate = 0.8)
        : (this.checkoutCouponRate = 1)
    );
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

  ngOnDestroy() {
    this.couponValue().unsubscribe();
  }
}
