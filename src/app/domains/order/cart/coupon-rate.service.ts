import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
interface Coupon {
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
  private coupons$$ = new BehaviorSubject<Coupon[]>([]);

  get coupon$() {
    return this.coupons$$.asObservable();
  }
  get couponCodes$() {
    return this.coupons$$
      .asObservable()
      .pipe(map((item) => item.map((el) => el.code)));
  }

  get couponValue() {
    return this.coupons$$.value;
  }
  get couponCodes() {
    return this.coupons$$.value.map((coupon) => coupon.code);
  }

  constructor() {
    // this.fetchCoupons();
  }

  fetchCoupons() {
    return this.http
      .get<Coupon[]>('/coupons')
      .pipe(
        tap({
          next: (result) => {
            this.coupons$$.next(result);
          },
        })
      )
      .subscribe();
  }
  fetchCouponsCodes(): Observable<string[]> {
    return this.http
      .get<Coupon[]>('/coupons')
      .pipe(map((item) => item.map(({ code }) => code)));
  }

  checkIfCouponValid(couponCode: string) {
    return this.http
      .get<Coupon[]>('/coupons')
      .pipe(map((code) => code.filter((item) => item.code === couponCode)));
  }

  updateWasUsed(id: number) {
    this.http
      .patch<Coupon>(`/coupons/${id}`, {
        wasUsed: true,
      })
      .pipe(
        tap({
          next: (result) => {
            this.coupons$$.next(
              this.coupons$$.value.map((coupon) =>
                coupon.id === id ? result : coupon
              )
            );
          },
        })
      )
      .subscribe();
  }
}
