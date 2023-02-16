import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgClass,
  NgIf,
} from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MultiplyByDirective } from 'src/app/shared/directives/multiply.directive';
import { MultiplyPipe } from 'src/app/shared/pipes';
import SumPipe from 'src/app/shared/pipes/sum.pipe';
import { CartStateService } from '../cart.state.service';
import { CouponRateService } from '../coupon-rate.service';

@Component({
  selector: 'app-cart-price',
  standalone: true,
  template: `
    <ng-container *ngIf="cartPrices$ | async as cartPrices">
      <p class="text-body-big" [ngClass]="couponRate < 1 ? 'color-green' : ''">
        Łączna kwota:
        <span appMultiply [multiplyBy]="2">{{ cartPrices }}</span
        >PLN
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
  imports: [
    MultiplyPipe,
    SumPipe,
    NgClass,
    NgIf,
    AsyncPipe,
    RouterModule,
    JsonPipe,
    CommonModule,
    MultiplyByDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPriceComponent {
  private cartService = inject(CartStateService);
  cartPrices$ = this.cartService.cartPrices$;
  coupons$ = inject(CouponRateService).coupon$;
  couponRateService = inject(CouponRateService);
  routerUrl = inject(Router).url;
  couponRate = 1;
  coupons = [
    {
      id: 1,
      code: 'aleKino',
      couponRate: 0.8,
      wasUsed: false,
    },
    {
      id: 2,
      code: 'aleOkazja',
      couponRate: 0.75,
      wasUsed: false,
    },
    {
      id: 3,
      code: 'aleGratka',
      couponRate: 0.6,
      wasUsed: true,
    },
  ];

  useCoupon(id: number) {
    this.couponRateService.updateWasUsed(id);
  }
}
