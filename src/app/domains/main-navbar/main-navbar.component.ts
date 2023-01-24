import { Component, inject, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/core/user-state.service';
import { AuthService } from '../../auth';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-main-navbar',
  template: `<nav>
    <div class="brand-name"><p routerLink="">Ale kino!</p></div>
    <div class="nav-buttons">
      <ng-container *ngIf="!hasAuth()"
        ><button class="btn login-btn">
          <a routerLink="logowanie">Zaloguj</a>
        </button></ng-container
      >
      <ng-container *ngIf="hasAuth()">
        <button class="btn cart-btn">
          <a routerLink="koszyk"
            >Koszyk
            <ng-container *ngIf="cart$ | async as cart"
              ><sup *ngIf="cart.length > 0"
                >{{ cart.length }}
              </sup></ng-container
            >
          </a></button
        ><button class="btn login-btn" (click)="logout()">Wyloguj</button>
        <button class="btn login-btn">
          <a routerLink="do-obejrzenia">Watchlist</a>
        </button>
        <ng-container *ngIf="userName$">
          <p>Witaj, {{ userName$ | async }}</p></ng-container
        >
      </ng-container>
    </div>
  </nav> `,
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent {
  private auth = inject(AuthService);
  userName$ = inject(UserStateService).userName$;
  cart$ = inject(CartService).cart$;

  logout() {
    this.auth.logout();
  }
  hasAuth() {
    return this.auth.checkIfHasAuth();
  }
}
