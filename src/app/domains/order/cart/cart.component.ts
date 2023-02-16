import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { UserStateService } from 'src/app/core/user.state.service';
import { CartStateService } from './cart.state.service';
import { Router, RouterModule } from '@angular/router';

import SumPipe from 'src/app/shared/pipes/sum.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { MultiplyPipe } from 'src/app/shared/pipes/multiply.pipe';
import { ReservedSeatsService } from '../tickets/reserved-seats.service';
import ShowingDetailsComponent from '../showing-details/showing-details.component';
import { CartPriceComponent } from './cart-price/cart-price.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [
    RouterModule,
    ShowingDetailsComponent,
    SumPipe,
    MultiplyPipe,
    CommonModule,
    MatButtonModule,
    CartPriceComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CartComponent {
  @Input() couponRate = 1;
  private reservedSeatsService = inject(ReservedSeatsService);
  private cartService = inject(CartStateService);
  cart$ = inject(CartStateService).cart$;
  routerUrl = inject(Router).url;
  userID = inject(UserStateService).getUserID();
  cartPrices$ = this.cartService.cartPrices$;

  ngOnInit() {
    this.cartService.getCart(this.userID);
  }

  onRemoveFromCart(
    ticketId: string,
    row: string,
    column: number,
    showingID: number
  ) {
    this.cartService.removeFromCart(ticketId, this.userID);
    this.reservedSeatsService.removeSeat(row, column, showingID);
  }
}
