import { Component, inject, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/core/user-state.service';
import { AuthService } from '../../auth';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-main-navbar',
  template: `<nav>
    <div class="brand-name"><p routerLink="">Ale kino!</p></div>
    <div class="nav-buttons">
      <ng-template #zaloguj>
        <a mat-raised-button color="primary" routerLink="logowanie">Zaloguj</a>
      </ng-template>
      <button class="btn cart-btn" mat-raised-button color="primary">
        <a routerLink="koszyk"
          ><mat-icon>add_shopping_cart</mat-icon>
          <ng-container *ngIf="cart$ | async as cart"
            ><sup *ngIf="cart.length > 0">{{ cart.length }} </sup></ng-container
          >
        </a>
      </button>

      <ng-container *ngIf="(auth$ | async)?.hasAuth; else zaloguj">
        <button mat-button mat-raised-button [matMenuTriggerFor]="menu">
          <ng-container *ngIf="userName$">
            <p>Witaj, {{ userName$ | async }}</p></ng-container
          >
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>Moje bilety</button>
          <button mat-menu-item>Ustawienia</button>
          <a mat-menu-item routerLink="do-obejrzenia">Watchlist</a>
          <button mat-menu-item (click)="onLogout()">Wyloguj</button>
        </mat-menu>
      </ng-container>
    </div>
  </nav> `,
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  userID = inject(UserStateService).getUserID();
  userName$ = inject(UserStateService).userName$;
  cart$ = inject(CartService).cart$;
  auth$ = inject(AuthService).auth$;

  ngOnInit() {
    this.cartService.getCart(this.userID);
  }
  onLogout() {
    this.authService.logout();
  }
  // hasAuth() {
  //   return this.auth.checkIfHasAuth();
  // }
}
