import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
export interface Coupon {
  id: number;
  code: string;
  couponRate: number;
  wasUsed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CouponRateService {
  private http = inject(HttpClient);
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

  checkIfCouponValid(couponCode: string) {
    return this.http
      .get<Coupon[]>('/coupons')
      .pipe(map((code) => code.filter((item) => item.code === couponCode)));
  }

  updateCouponRate(coupon: string) {
    if (coupon) {
      return this.http
        .get<Coupon[]>(`/coupons?code=${coupon}`)
        .pipe(
          map((code) => code[0]),
          tap({
            next: (result) =>
              this.couponRate$$.next({
                couponRate: result.couponRate,
                id: result.id,
              }),
          })
        )
        .subscribe();
    } else {
      return this.couponRate$$.next({ couponRate: 1, id: 0 });
    }
  }

  updateWasUsed() {
    if (this.couponId) {
      this.http
        .patch<Coupon>(`/coupons/${this.couponId}`, {
          wasUsed: true,
        })
        .subscribe();
    }
  }
}
