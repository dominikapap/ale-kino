import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgClass,
  NgIf,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { MultiplyByDirective } from 'src/app/shared/directives/multiply.directive';
import { CartStateService } from '../cart.state.service';
import { CouponRateStateService } from '../coupon-rate.state.service';

interface PaymentData {
  cart: number;
  couponRate: {
    couponRate: number;
    id: number;
  };
}
@Component({
  selector: 'app-cart-price[paymentData]',
  standalone: true,
  templateUrl: 'cart-price.component.html',
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
export class CartPriceComponent implements OnDestroy {
  @Input() paymentData!: PaymentData;
  private couponRateService = inject(CouponRateStateService);
  routerUrl = inject(Router).url;

  ngOnDestroy() {
    this.couponRateService.updateCouponRate('');
  }
}
