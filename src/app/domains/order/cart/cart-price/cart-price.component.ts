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
import { CartStateService } from '../cart.state.service';
import { CouponRateStateService } from '../coupon-rate.state.service';

@Component({
  selector: 'app-cart-price',
  standalone: true,
  template: `
    <ng-container *ngIf="cartPrices$ | async as cartPrices">
      <p class="text-body">
        Łączny koszt biletów:
        <span>{{ cartPrices | number : '1.2-2' }}</span
        >PLN
      </p>
      <ng-container *ngIf="couponRate$ | async as couponRate">
        <ng-container *ngIf="couponRate.couponRate < 1">
          <p class="text-body color-success">
            Kod zniżkowy: -
            <span
              appMultiply
              [multiplyBy]="1 - couponRate.couponRate"
              [valueToMultiply]="cartPrices"
              >{{ cartPrices }}</span
            >
            PLN
          </p>
          <p class="text-body-big">
            Całkowita kwota:
            <span
              appMultiply
              [multiplyBy]="couponRate.couponRate"
              [valueToMultiply]="cartPrices"
              >{{ cartPrices | number : '1.2-2' }}</span
            >
            PLN
          </p>
        </ng-container>
      </ng-container>

      <a
        *ngIf="routerUrl === '/cart'"
        mat-raised-button
        color="primary"
        routerLink="/checkout"
        >Przejdź do zamówienia</a
      ></ng-container
    >
  `,
  styles: [],
  imports: [
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
  cartPrices$ = inject(CartStateService).cartPrices$;
  private couponRateService = inject(CouponRateStateService);
  couponRate$ = this.couponRateService.couponRate$;
  routerUrl = inject(Router).url;

  ngOnDestroy() {
    this.couponRateService.updateCouponRate('');
  }
}
