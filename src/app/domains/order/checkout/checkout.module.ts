import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { PaymentComponent } from './payment/payment.component';
import CartComponent from '../cart/cart.component';
import { NumbersOnlyDirective } from 'src/app/shared/directives/numbers-only.directive';
import { MultiplyByDirective } from 'src/app/shared/directives/multiply.directive';
import { MatIconModule } from '@angular/material/icon';
import { DirectAccessGuard } from 'src/app/shared/guards/direct-access.guard';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
];
@NgModule({
  declarations: [CheckoutComponent, PaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CartComponent,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    NumbersOnlyDirective,
    MultiplyByDirective,
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [DirectAccessGuard],
      },
    ]),
  ],
})
export default class CheckoutModule {}
