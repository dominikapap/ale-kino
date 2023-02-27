import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { CouponRateApiService } from './coupon-rate.api.service';
export interface Coupon {
  id: number;
  code: string;
  couponRate: number;
  wasUsed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CouponRateStateService {
  private couponRateApiService = inject(CouponRateApiService);
  private snackBarService = inject(SnackBarService);
  private couponRate$$ = new BehaviorSubject<{
    couponRate: number;
    id: number;
  }>({
    couponRate: 1,
    id: 0,
  });

  get couponRate$() {
    return this.couponRate$$.asObservable();
  }

  get couponId() {
    return this.couponRate$$.value.id;
  }

  updateCouponRate(coupon: string) {
    if (coupon) {
      this.couponRateApiService
        .getCouponByName(coupon)
        .pipe(
          map((code) => code[0]),
          tap({
            next: (result) =>
              this.couponRate$$.next({
                couponRate: result.couponRate,
                id: result.id,
              }),
            error: (e) => {
              this.snackBarService.openSnackBar(
                'Nie udało się pobrać kodów rabatowych, spróbuj ponownie później',
                3000
              );
            },
          })
        )
        .subscribe();
    } else {
      return this.couponRate$$.next({ couponRate: 1, id: 0 });
    }
  }

  updateWasUsed() {
    if (this.couponId) {
      this.couponRateApiService.patch(this.couponId).subscribe();
    }
  }
}
