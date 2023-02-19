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
  private couponRate$$ = new BehaviorSubject<{ couponRate: number }>({
    couponRate: 1,
  });

  get couponRate$() {
    return this.couponRate$$.asObservable();
  }
  // get couponCodes$() {
  //   return this.coupons$$
  //     .asObservable()
  //     .pipe(map((item) => item.map((el) => el.code)));
  // }

  // get couponValue() {
  //   return this.coupons$$.value;
  // }
  // get couponCodes() {
  //   return this.coupons$$.value.map((coupon) => coupon.code);
  // }

  constructor() {
    // this.fetchCoupons();
  }

  // fetchCoupons() {
  //   return this.http
  //     .get<Coupon[]>('/coupons')
  //     .pipe(
  //       tap({
  //         next: (result) => {
  //           this.coupons$$.next(result);
  //         },
  //       })
  //     )
  //     .subscribe();
  // }
  // fetchCouponsCodes(): Observable<string[]> {
  //   return this.http
  //     .get<Coupon[]>('/coupons')
  //     .pipe(map((item) => item.map(({ code }) => code)));
  // }

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
          map((code) => code[0].couponRate),
          tap({
            next: (result) => this.couponRate$$.next({ couponRate: result }),
          })
        )
        .subscribe();
    } else {
      return this.couponRate$$.next({ couponRate: 1 });
    }
  }
  updateWasUsed(id: number) {
    this.http
      .patch<Coupon>(`/coupons/${id}`, {
        wasUsed: true,
      })
      .subscribe();
  }
}
