import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './domains/cart/cart.component';
import { CheckoutComponent } from './domains/checkout/checkout.component';
import { ConfirmationComponent } from './domains/confirmation/confirmation.component';
import { LoginComponent } from './auth/login.component';
import { PageNotFoundComponent } from './domains/page-not-found/page-not-found.component';
import { SettingsComponent } from './domains/settings/settings.component';
import { ShowingsComponent } from './domains/showings/showings.component';
import { TicketsComponent } from './domains/tickets/tickets.component';
import { UserTicketsComponent } from './domains/user-tickets/user-tickets.component';
import { WatchListComponent } from './domains/watch-list/watch-list.component';
import { hasAuthGuard } from './auth/has-auth-guard.guard';

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
        canActivate: [hasAuthGuard],
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
