import { Component, inject } from '@angular/core';
import { UserStateService } from 'src/app/core/user-state.service';
import { CartService } from './cart.service';
import { RouterModule } from '@angular/router';
import ShowingDetailsComponent from 'src/app/shared/showing-details/showing-details.component';
import SumPipe from 'src/app/shared/pipes/sum.pipe';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [
    RouterModule,
    ShowingDetailsComponent,
    SumPipe,
    AsyncPipe,
    CommonModule,
  ],
})
export default class CartComponent {
  private cartService = inject(CartService);
  cart$ = this.cartService.cart$;
  cartPrices$ = this.cartService.cartPrices$;
  test = [1, 2, 3];
  userID = inject(UserStateService).getUserID();

  ngOnInit() {
    this.cartService.getCart(this.userID);
  }

  onRemoveFromCart(ticketId: number) {
    this.cartService.removeFromCart(ticketId);
    //todo remove from reserved tickets
  }

  sumPrice(cart: number[]) {
    let sum = 0;
    cart.forEach((item) => (sum += item));
    console.log(sum);
    return sum;
  }
}
