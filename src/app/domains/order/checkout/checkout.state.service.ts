import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

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
export class CheckoutStateService {
  private checkout$$ = new ReplaySubject<CheckoutInfo>(1);

  get checkout$() {
    return this.checkout$$.asObservable();
  }

  setCheckoutState(data: CheckoutInfo) {
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
