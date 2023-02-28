import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from './coupon-rate.state.service';

@Injectable({
  providedIn: 'root',
})
export class CouponRateApiService {
  private http = inject(HttpClient);

  getCouponByName(coupon: string): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`/coupons?code=${coupon}`);
  }

  patch(couponId: number): Observable<Coupon> {
    return this.http.patch<Coupon>(`/coupons/${couponId}`, {
      wasUsed: true,
    });
  }
}
