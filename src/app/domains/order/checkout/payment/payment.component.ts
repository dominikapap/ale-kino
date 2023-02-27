import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CartStateService } from '../../cart/cart.state.service';
import { BookedSeatsStateService } from '../../services/booked-seats.state.service';
import { v4 as createUuidv4 } from 'uuid';
import { DatesService } from 'src/app/domains/movies/services/dates.service';
import { CouponRateStateService } from '../../cart/coupon-rate.state.service';
import { OrderApiService } from './order-api.service';
import { CheckoutUserDataStateService } from '../checkout-user-data.state.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  private builder = inject(NonNullableFormBuilder);
  private cartValue = inject(CartStateService).cartValue;
  private datesService = inject(DatesService);
  private bookedSeatsService = inject(BookedSeatsStateService);
  private orderApiService = inject(OrderApiService);
  private checkoutUserDataService = inject(CheckoutUserDataStateService);
  private couponRateStateService = inject(CouponRateStateService);
  private cartService = inject(CartStateService);
  private snackBarService = inject(SnackBarService);
  private cdr = inject(ChangeDetectorRef);
  cartPrices$ = this.cartService.cartPrices$;
  couponRate$ = this.couponRateStateService.couponRate$;
  paymentData$ = combineLatest([this.cartPrices$, this.couponRate$]).pipe(
    map(([cart, couponRate]) => ({ cart, couponRate }))
  );
  readonly INPUT_LENGTH = 6;
  orderID = createUuidv4();
  notPaid = true;
  showSpinner = false;

  blikForm = this.builder.group({
    blikNum: this.builder.control(null, {
      validators: [Validators.required, Validators.pattern('[0-9]{6}')],
    }),
  });

  ngOnInit() {
    if (this.checkoutUserDataService.checkoutUserDataValues.couponCode) {
      this.couponRateStateService.updateCouponRate(
        this.checkoutUserDataService.checkoutUserDataValues.couponCode
      );
    }
  }

  ngOnDestroy() {
    this.couponRateStateService.updateCouponRate('');
  }

  onSubmit() {
    this.blikForm.markAllAsTouched();
    if (this.blikForm.valid) {
      const currDay = this.datesService.getCurrentDay();
      this.bookSeats(currDay);
      this.postOrder(currDay);
      this.couponRateStateService.updateWasUsed();
      this.showConfirmation();
    } else {
      this.snackBarService.openSnackBar('Podaj prawidłowy kod BLIK', 3000);
    }
  }

  private showConfirmation() {
    this.showSpinner = true;
    return setTimeout(() => {
      this.notPaid = false;
      this.showSpinner = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  private bookSeats(currDay: string) {
    this.cartValue.forEach((ticket) => {
      this.bookedSeatsService.bookSeat(ticket, this.orderID, currDay);
    });
  }

  private postOrder(currDay: string) {
    this.orderApiService.postOrderData(
      this.orderID,
      currDay,
      this.checkoutUserDataService.checkoutUserDataValues
    );
  }
}
