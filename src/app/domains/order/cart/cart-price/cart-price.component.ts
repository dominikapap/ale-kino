import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgClass,
  NgIf,
} from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { MultiplyByDirective } from 'src/app/shared/directives/multiply.directive';
import { CartStateService } from '../cart.state.service';
import { CouponRateStateService } from '../coupon-rate.state.service';

@Component({
  selector: 'app-cart-price',
  standalone: true,
  template: `
    <ng-container *ngIf="paymentData$ | async as data">
      <p class="text-body">
        Łączny koszt biletów:
        <span>{{ data.cart | number : '1.2-2' }}</span
        >PLN
      </p>

      <ng-container *ngIf="data.couponRate.couponRate < 1">
        <p class="text-body color-success">
          Kod zniżkowy: -
          <span
            appMultiply
            [multiplyBy]="1 - data.couponRate.couponRate"
            [valueToMultiply]="data.cart"
            >{{ data.cart }}</span
          >
          PLN
        </p>
        <p class="text-body-big">
          Całkowita kwota:
          <span
            appMultiply
            [multiplyBy]="data.couponRate.couponRate"
            [valueToMultiply]="data.cart"
            >{{ data.cart | number : '1.2-2' }}</span
          >
          PLN
        </p>
      </ng-container>

      <a
        *ngIf="routerUrl === '/cart'"
        mat-raised-button
        color="primary"
        routerLink="/checkout"
        class="mt-2 inline-block"
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
  private couponRateService = inject(CouponRateStateService);
  couponRate$ = this.couponRateService.couponRate$;
  cartPrices$ = inject(CartStateService).cartPrices$;
  paymentData$ = combineLatest([this.cartPrices$, this.couponRate$]).pipe(
    map(([cart, couponRate]) => ({ cart, couponRate }))
  );
  routerUrl = inject(Router).url;

  ngOnDestroy() {
    this.couponRateService.updateCouponRate('');
  }
}
