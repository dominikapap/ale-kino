import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { DaysComponent } from './days/days.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


export const routes: Routes = [
  {
    path:'',
    component: AppComponent
  }, 
  {
    path:'logowanie',
    component: LoginComponent
  },
  {
    path:'koszyk',
    component: CartComponent
  },
  {
    path:'zamowienie',
    component: CheckoutComponent
  },
  {
    path:'potwierdzenie',
    component: ConfirmationComponent
  },
]


@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    MainFooterComponent,
    MoviesDetailsComponent,
    DaysComponent,
    WatchListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
