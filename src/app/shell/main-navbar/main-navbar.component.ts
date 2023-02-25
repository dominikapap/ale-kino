import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UserStateService } from 'src/app/auth/user.state.service';
import { AuthStateService } from '../../auth';
import { CartStateService } from '../../domains/order/cart/cart.state.service';

@Component({
  selector: 'app-main-navbar',
  template: `<nav>
    <ng-container *ngIf="userRole$ | async as userRole">
      <div class="brand-name">
        <p [routerLink]="userRole !== 'Admin' ? '' : 'admin'">Ale kino!</p>
      </div>
      <div class="nav-buttons">
        <ng-template #zaloguj>
          <a mat-raised-button color="primary" routerLink="login">Zaloguj</a>
        </ng-template>
        <ng-container *ngIf="userRole !== 'Admin'"
          ><a
            class="btn cart-btn"
            mat-raised-button
            color="primary"
            routerLink="cart"
            ><mat-icon>add_shopping_cart</mat-icon>
            <ng-container *ngIf="cart$ | async as cart"
              ><sup *ngIf="cart.length > 0"
                >{{ cart.length }}
              </sup></ng-container
            >
          </a></ng-container
        >

        <ng-container *ngIf="(auth$ | async)?.hasAuth; else zaloguj">
          <button mat-button mat-raised-button [matMenuTriggerFor]="menu">
            <ng-container *ngIf="userName$">
              <p>Witaj, {{ userName$ | async }}</p></ng-container
            >
          </button>
          <mat-menu #menu="matMenu">
            <ng-container *ngIf="userRole !== 'Admin'">
              <button mat-menu-item routerLink="user-tickets">
                Moje bilety
              </button>
              <a mat-menu-item routerLink="watchlist"
                >Watchlist</a
              ></ng-container
            ><a mat-menu-item>Ustawienia</a>
            <button mat-menu-item (click)="onLogout()">Wyloguj</button>
          </mat-menu>
        </ng-container>
      </div></ng-container
    >
  </nav> `,
  styleUrls: ['./main-navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavbarComponent implements OnInit {
  private auth = inject(AuthStateService);
  private cartService = inject(CartStateService);
  private userStateService = inject(UserStateService);
  userName = inject(UserStateService).getUserName();
  userName$ = inject(UserStateService).userName$;
  userId$ = inject(UserStateService).userId$;
  userRole$ = inject(UserStateService).userRole$;
  cart$ = inject(CartStateService).cart$;
  auth$ = inject(AuthStateService).auth$;

  ngOnInit() {
    const userID = this.userStateService.getUserID();
    this.cartService.getCart(userID);
  }
  onLogout() {
    this.auth.logout();
  }
}
