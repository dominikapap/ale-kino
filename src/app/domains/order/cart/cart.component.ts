import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CartStateService } from './cart.state.service';
import { Router, RouterModule } from '@angular/router';
import SumPipe from 'src/app/shared/pipes/sum.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MultiplyPipe } from 'src/app/shared/pipes/multiply.pipe';
import { ReservedSeatsService } from '../tickets/reserved-seats.state.service';
import ShowingDetailsComponent from '../showing-details/showing-details.component';
import { CartPriceComponent } from './cart-price/cart-price.component';
import { UserStateService } from 'src/app/auth';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, map } from 'rxjs';
import { CouponRateStateService } from './coupon-rate.state.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styles: [],
  imports: [
    RouterModule,
    ShowingDetailsComponent,
    SumPipe,
    MultiplyPipe,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CartPriceComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CartComponent implements OnInit {
  @Input() couponRate = 1;
  private reservedSeatsService = inject(ReservedSeatsService);
  private cartService = inject(CartStateService);
  private couponRateService = inject(CouponRateStateService);
  couponRate$ = this.couponRateService.couponRate$;
  cartPrices$ = this.cartService.cartPrices$;
  paymentData$ = combineLatest([this.cartPrices$, this.couponRate$]).pipe(
    map(([cart, couponRate]) => ({ cart, couponRate }))
  );
  cart$ = this.cartService.cart$;
  routerUrl = inject(Router).url;
  userID = inject(UserStateService).getUserID();

  ngOnInit() {
    this.cartService.getCart(this.userID);
  }

  onRemoveFromCart(
    ticketID: string,
    row: string,
    column: number,
    showingID: number,
    userID: number
  ) {
    this.cartService.removeFromCart(ticketID, userID);
    this.reservedSeatsService.removeSeat(row, column, showingID);
  }
}
