import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import CartComponent from '../cart/cart.component';
import { PaymentComponent } from './payment/payment.component';

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
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutComponent,
      },
      {
        path: 'platnosc',
        component: PaymentComponent,
      },
    ]),
  ],
})
export default class CheckoutModule {}
