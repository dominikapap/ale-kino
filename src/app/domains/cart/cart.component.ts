import { Component, inject } from '@angular/core';
import { UserStateService } from 'src/app/core/user.state.service';
import { CartService } from './cart.service';
import { Router, RouterModule } from '@angular/router';
import ShowingDetailsComponent from 'src/app/shared/showing-details/showing-details.component';
import SumPipe from 'src/app/shared/pipes/sum.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReservedSeatsService } from '../tickets/reserved-seats.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [
    RouterModule,
    ShowingDetailsComponent,
    SumPipe,
    CommonModule,
    MatButtonModule,
  ],
})
export default class CartComponent {
  private reservedSeatsService = inject(ReservedSeatsService);
  private cartService = inject(CartService);
  cart$ = inject(CartService).cart$;
  routerUrl = inject(Router).url;

  cartPrices$ = this.cartService.cartPrices$;
  userID = inject(UserStateService).getUserID();

  ngOnInit() {
    this.cartService.getCart(this.userID);
  }

  onRemoveFromCart(ticketId: string, row: string, column: number) {
    this.cartService.removeFromCart(ticketId, this.userID);
    this.reservedSeatsService.removeSeat(row, column);
  }
}
