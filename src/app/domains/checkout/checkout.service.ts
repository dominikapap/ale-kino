import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { CheckoutForm } from 'src/app/interfaces/CheckoutForm';

interface CheckoutInfo {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  newsletter: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private http = inject(HttpClient);
  private checkout$$ = new ReplaySubject<CheckoutInfo>(1);

  get checkout$() {
    return this.checkout$$.asObservable();
  }

  setCheckoutState(data: any) {
    return this.checkout$$.next({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      newsletter: data.newsletter,
      phoneNumber: data.phoneNumber,
    });
  }

  clearCheckoutState() {
    return this.checkout$$.next({
      email: '',
      firstName: '',
      lastName: '',
      newsletter: false,
      phoneNumber: 0,
    });
  }
}
