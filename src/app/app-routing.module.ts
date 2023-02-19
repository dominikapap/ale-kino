import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasAuthGuard } from './auth';
import { PageNotFoundComponent } from './core';
import { ShowingsComponent } from './domains/movies';
import { TicketsComponent } from './domains/order';
import { SettingsComponent, WatchListComponent } from './domains/user/';
import { DirectAccessGuard } from './shared/guards/direct-access.guard';
import { ShellComponent } from './shell/';

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
            path: 'login',
            loadChildren: () => import('./auth/login/login.module'),
          },
          {
            path: 'showing/:id',
            component: TicketsComponent,
          },
          {
            path: 'settings',
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
            path: 'cart',
            loadComponent: () => import('./domains/order/cart/cart.component'),
          },
          {
            path: 'checkout',
            loadChildren: () =>
              import('./domains/order/checkout/checkout.module'),
            canActivate: [DirectAccessGuard],
          },
          {
            path: 'watchlist',
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
