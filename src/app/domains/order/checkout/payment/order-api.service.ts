import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'src/app/core/User.interface';
import { CheckoutUserData } from '../checkout-user-data.state.service';
interface Order {
  id: string;
  date: string;
  userData: CheckoutUserData;
}

@Injectable({
  providedIn: 'root',
})
export class OrderApiService {
  private http = inject(HttpClient);

  postOrderData(id: string, date: string, userData: CheckoutUserData) {
    return this.http
      .post<Order>('/orders', {
        id,
        date,
        userData,
      })
      .subscribe();
  }
}
