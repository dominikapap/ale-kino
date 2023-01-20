import { Component, inject, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/core/user-state.service';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-main-navbar',
  template: `<nav>
    <div class="brand-name"><p routerLink="">Ale kino!</p></div>
    <div class="nav-buttons">
      <button class="btn cart-btn">Cart</button>
      <ng-container *ngIf="!hasAuth()"
        ><button class="btn login-btn">
          <a routerLink="logowanie">Zaloguj</a>
        </button></ng-container
      >
      <ng-container *ngIf="hasAuth()"
        ><button class="btn login-btn" (click)="logout()">Wyloguj</button>
        <button class="btn login-btn">
          <a routerLink="do-obejrzenia">Watchlist</a>
        </button>
        <p>Witaj, {{ userName }}</p></ng-container
      >
    </div>
  </nav> `,
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent {
  private auth = inject(AuthService);
  userName = inject(UserStateService).getUserName();
  ngOnInit() {
    console.log(this.userName);
  }

  logout() {
    this.auth.logout();
  }
  hasAuth() {
    return this.auth.checkIfHasAuth();
  }
}
