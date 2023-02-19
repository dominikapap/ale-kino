import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface CheckoutUserData {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  newsletter: boolean;
  couponCode?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutUserDataStateService {
  private checkoutUserData$$ = new BehaviorSubject<CheckoutUserData>({
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    email: '',
    newsletter: false,
    couponCode: '',
  });

  get checkoutUserDataValues() {
    return this.checkoutUserData$$.value;
  }

  updateUserDataState(checkoutFormValue: CheckoutUserData) {
    this.checkoutUserData$$.next(checkoutFormValue);
  }
}
