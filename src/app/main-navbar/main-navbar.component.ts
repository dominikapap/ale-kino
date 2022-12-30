import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app-main-navbar',
  template: `<nav>
    <div class="brand-name"><p>Ale kino!</p></div>
    <div class="nav-buttons">
      <button class="btn cart-btn">Cart</button>
      <button class="btn login-btn">
        <a routerLink="logowanie">Zaloguj</a>
      </button>
      <button class="btn login-btn" (click)="logout()">Wyloguj</button>
    </div>
  </nav> `,
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent implements OnInit {
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }
  hasAuth() {
    return this.auth.checkIfHasAuth();
  }
}
