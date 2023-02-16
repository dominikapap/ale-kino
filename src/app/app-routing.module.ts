import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasAuthGuard } from './auth/has-auth-guard.guard';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ShowingsComponent } from './domains/movies/showings/showings.component';
import { ConfirmationComponent } from './domains/order/confirmation/confirmation.component';
import { TicketsComponent } from './domains/order/tickets/tickets.component';
import { SettingsComponent } from './domains/user/settings/settings.component';
import { WatchListComponent } from './domains/user/watch-list';
import { ShellComponent } from './shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ShellComponent,
        children: [
          { path: '', redirectTo: `repertoire`, pathMatch: 'full' },
          { path: 'repertoire', component: ShowingsComponent },
          { path: 'repertoire/:date', component: ShowingsComponent },

          {
            path: 'logowanie',
            loadChildren: () => import('./auth/login.module'),
          },
          {
            path: 'kup-bilet/:id',
            component: TicketsComponent,
          },
          {
            path: 'ustawienia',
            component: SettingsComponent,
            canActivate: [hasAuthGuard],
          },
          {
            path: 'user-tickets',
            loadComponent: () =>
              import('./domains/user/user-tickets/user-tickets.component'),
            canActivate: [hasAuthGuard],
          },
          {
            path: 'koszyk',
            loadComponent: () => import('./domains/order/cart/cart.component'),
          },
          {
            path: 'zamowienie',
            loadChildren: () =>
              import('./domains/order/checkout/checkout.module'),
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
            path: 'tickets/:id',
            loadComponent: () =>
              import('./domains/order/order-summary/order-summary.component'),
          },
        ],
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
