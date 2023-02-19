import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartStateService } from '../../cart/cart.state.service';
import { BookedSeatsStateService } from '../../services/booked-seats.state.service';
import { v4 as createUuidv4 } from 'uuid';
import { DatesService } from 'src/app/domains/movies/services/dates.service';
import { CouponRateService } from '../../cart/coupon-rate.service';
import { OrderApiService } from './order-api.service';
import { CheckoutUserDataStateService } from '../checkout-user-data.state.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  private builder = inject(NonNullableFormBuilder);
  private cartValue = inject(CartStateService).cartValue;
  private datesService = inject(DatesService);
  private bookedSeatsService = inject(BookedSeatsStateService);
  private orderApiService = inject(OrderApiService);
  private checkoutUserDataService = inject(CheckoutUserDataStateService);
  private couponRateService = inject(CouponRateService);
  private cartService = inject(CartStateService);
  cartPrices$ = this.cartService.cartPrices$;
  couponRate$ = this.couponRateService.couponRate$;
  readonly INPUT_LENGTH = 6;
  orderID = createUuidv4();
  notPaid = true;

  blikForm = this.builder.group({
    blikNum: this.builder.control(null, {
      validators: [Validators.required, Validators.pattern('[0-9]{6}')],
    }),
  });

  onSubmit() {
    this.blikForm.markAllAsTouched();
    if (this.blikForm.valid) {
      const currDay = this.datesService.getCurrentDay();
      this.cartValue.forEach((ticket) => {
        this.bookedSeatsService.bookSeat(ticket, this.orderID, currDay);
      });
      this.orderApiService.postOrderData(
        this.orderID,
        currDay,
        this.checkoutUserDataService.checkoutUserDataValues
      );
      this.couponRateService.updateWasUsed();
      this.notPaid = false;
    } else {
      alert('Podaj prawidłowy kod BLIK');
    }
  }
}
