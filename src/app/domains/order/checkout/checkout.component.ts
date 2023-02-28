import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/User.interface';
import { confirmEmailValidator } from './confirmEmailValidator';
import { CheckoutForm } from 'src/app/shared/interfaces/CheckoutForm';
import { CouponRateStateService } from '../cart/coupon-rate.state.service';
import { couponCodeValidator } from './couponCodeValidator';
import { CheckoutUserDataStateService } from './checkout-user-data.state.service';
import { emailValidator } from './emailValidator';
import { CouponRateApiService } from '../cart/coupon-rate.api.service';
import { UserStateService } from 'src/app/auth';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  private builder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private couponRateStateService = inject(CouponRateStateService);
  private couponRateApiService = inject(CouponRateApiService);
  private checkoutUserDataStateService = inject(CheckoutUserDataStateService);
  private snackBarService = inject(SnackBarService);
  user = inject(UserStateService).getUserInfo();
  checkoutForm = this.createCheckoutForm();
  couponCodes$ = this.couponRateStateService.couponRate$;
  confirmEmailErrorMessages = {
    required: 'Potwierdzenie email jest wymaganym polem',
    pattern: 'Niewłaściwy format adresu email',
    notMatch: 'Adresy email nie są zgodne',
  };

  ngOnInit() {
    if (this.user.userID > 0) {
      this.fillForm(this.user);
    }
    this.couponValue();
  }

  get checkoutFormCtrls() {
    return this.checkoutForm.controls;
  }

  get firstNameCtrl() {
    return this.checkoutForm.controls.firstName;
  }
  get lastNameCtrl() {
    return this.checkoutForm.controls.lastName;
  }
  get phoneNumberCtrl() {
    return this.checkoutForm.controls.phoneNumber;
  }
  get emailCtrl() {
    return this.checkoutForm.controls.email;
  }
  get confirmEmailCtrl() {
    return this.checkoutForm.controls.confirmEmail;
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
      this.snackBarService.openSnackBar(
        'Niepoprawnie wypełniony formularz',
        3000
      );
    } else {
      this.checkoutUserDataStateService.updateUserDataState(
        this.checkoutForm.getRawValue()
      );
      this.router.navigate(['checkout/payment']);
    }
  }

  couponValue() {
    return this.couponCodeCtrl.statusChanges.subscribe(() =>
      this.couponCodeCtrl.valid && this.couponCodeCtrl.value
        ? this.couponRateStateService.updateCouponRate(
            this.couponCodeCtrl.value
          )
        : this.couponRateStateService.updateCouponRate('')
    );
  }

  private createCheckoutForm(): CheckoutForm {
    const form = this.builder.group({
      firstName: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      }),
      lastName: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      }),
      phoneNumber: this.builder.control(null as unknown as number, {
        validators: [Validators.required, Validators.pattern(/^\d{9}$/)],
      }),
      email: this.builder.control('', {
        validators: [Validators.required, emailValidator()],
      }),
      confirmEmail: this.builder.control('', {
        validators: [
          Validators.required,
          emailValidator(),
          confirmEmailValidator('email'),
        ],
      }),
      newsletter: this.builder.control(false),
      couponCode: this.builder.control('', {
        validators: [Validators.minLength(1)],
        asyncValidators: [couponCodeValidator(this.couponRateApiService)],
        updateOn: 'blur' || 'submit',
      }),
    });
    return form;
  }

  ngOnDestroy() {
    this.couponValue().unsubscribe();
  }
}
