import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import CartComponent from '../cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
];
@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CartComponent,
  ],
})
export default class LoginModule {}
