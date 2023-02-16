import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { CouponRateService } from '../cart/coupon-rate.service';

export function couponCodeValidator(
  couponRateService: CouponRateService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return couponRateService
      .checkIfCouponValid(control.value)
      .pipe(
        map((code) =>
          code.length == 0
            ? control.value === ''
              ? null
              : { couponInvalid: true }
            : code[0].wasUsed
            ? { couponUsed: true }
            : null
        )
      );
  };
}
