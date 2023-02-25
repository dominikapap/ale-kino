import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { CouponRateApiService } from '../cart/coupon-rate.api.service';

export function couponCodeValidator(
  couponRateApiService: CouponRateApiService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return couponRateApiService
      .getCouponByName(control.value)
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
