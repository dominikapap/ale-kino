import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './admin/admin.guard';
import { hasAuthGuard } from './auth';
import { userOrGuestGuard } from './auth/userOrGuest.guard';

import { ShowingsComponent } from './domains/movies';
import { TicketsComponent } from './domains/order';
import { DirectAccessGuard } from './shared/guards/direct-access.guard';
import { ShellComponent } from './shell/';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module'),
        canActivate: [adminGuard],
      },
      {
        path: '',
        component: ShellComponent,
        canActivate: [userOrGuestGuard],
        children: [
          { path: '', redirectTo: `repertoire`, pathMatch: 'full' },
          {
            path: 'repertoire',
            component: ShowingsComponent,
            canActivate: [userOrGuestGuard],
          },
          { path: 'repertoire/:date', component: ShowingsComponent },

          {
            path: 'showing/:id',
            loadChildren: () =>
              import('./domains/order/tickets/tickets.module'),
          },
          {
            path: 'settings',
            loadComponent: () =>
              import('./domains/user/settings/settings.component'),
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
            loadComponent: () =>
              import('./domains/user/watch-list/watch-list.component'),
            canActivate: [userOrGuestGuard],
          },
          {
            path: 'tickets/:id',
            loadComponent: () =>
              import('./domains/order/order-summary/order-summary.component'),
          },
        ],
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/login/login.module'),
      },
      {
        path: '**',
        loadComponent: () => import('./core/page-not-found.component'),
      },
      {
        path: 'error',
        loadComponent: () => import('./core/error-page.component'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
