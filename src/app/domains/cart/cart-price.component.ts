import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MultiplyPipe } from 'src/app/shared/pipes';
import SumPipe from 'src/app/shared/pipes/sum.pipe';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-price',
  standalone: true,
  template: `
    <ng-container *ngIf="cartPrices$ | async as cartPrices">
      <p class="text-body-big" [ngClass]="couponRate < 1 ? 'color-green' : ''">
        Łączna kwota: {{ cartPrices | sum | multiply : couponRate }}PLN
      </p>
      <a
        *ngIf="routerUrl === '/koszyk'"
        mat-raised-button
        color="primary"
        routerLink="/zamowienie"
        >Przejdź do zamówienia</a
      ></ng-container
    >
  `,
  styles: [],
  imports: [MultiplyPipe, SumPipe, NgClass, NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPriceComponent {
  private cartService = inject(CartService);
  cartPrices$ = this.cartService.cartPrices$;
  routerUrl = inject(Router).url;
  couponRate = 1;
}
