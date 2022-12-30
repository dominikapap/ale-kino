import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LoginComponent } from './auth/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { ShowingsComponent } from './showings/showings.component';
import { TicketsComponent } from './tickets/tickets.component';
import { UserTicketsComponent } from './user-tickets/user-tickets.component';
import { WatchListComponent } from './watch-list/watch-list.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ShowingsComponent,
      },
      {
        path: 'logowanie',
        component: LoginComponent,
      },
      {
        path: 'kup-bilet/:id',
        component: TicketsComponent,
      },
      {
        path: 'setting',
        component: SettingsComponent,
      },
      {
        path: 'moje-bilety',
        component: UserTicketsComponent,
      },
      {
        path: 'koszyk',
        component: CartComponent,
      },
      {
        path: 'zamowienie',
        component: CheckoutComponent,
      },
      {
        path: 'potwierdzenie',
        component: ConfirmationComponent,
      },
      {
        path: 'do-obejrzenia',
        component: WatchListComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
