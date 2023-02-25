import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './User.interface';
import { UserStateService } from './user.state.service';
import { CartStateService } from '../domains/order/cart/cart.state.service';
import { AuthApiService } from './auth.api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userStateService = inject(UserStateService);
  private cartService = inject(CartStateService);
  private authApiService = inject(AuthApiService);

  private auth$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get auth$() {
    return this.auth$$.asObservable();
  }
  constructor() {
    this.setStateFromLocalStorage();
  }

  checkCredentials(email: string, password: string) {
    this.authApiService.checkCredentials(email, password).subscribe({
      next: (results) => {
        if (results.length == 0) {
          alert('Błędne dane, spróbuj ponownie');
        } else {
          this.authorize(results[0]);
          this.cartService.getCart(results[0].userID);
        }
      },
      error: (e) => {
        console.log(e);
        alert('Coś poszło nie tak, spróbuj ponownie później');
      },
    });
  }

  authorize(user: User) {
    this.auth$$.next({ ...this.auth$$.value, hasAuth: true });
    this.userStateService.updateUser(user);
    localStorage.setItem('userID', user.userID.toString());
    localStorage.setItem('userRole', user.role.toString());
    if (user.role === 'Admin') {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['repertoire']);
    }
  }

  logout() {
    this.userStateService.clearUser();
    localStorage.removeItem('userID');
    localStorage.removeItem('userRole');
    this.cartService.emptyCart();
    this.auth$$.next({
      ...this.auth$$.value,
      hasAuth: false,
    });

    this.router.navigate(['login']);
    alert('wylogowano');
  }

  private setStateFromLocalStorage() {
    // checking with userID
    const userIDFromLS = localStorage.getItem('userID');
    const userRoleFromLS = localStorage.getItem('userRole');
    console.log(userRoleFromLS);
    if (userIDFromLS !== null) {
      this.auth$$.next({ hasAuth: true });
      this.userStateService.fetchUser(parseInt(userIDFromLS));
    }
    if (userRoleFromLS == 'Admin' || userRoleFromLS == 'User') {
      this.userStateService.updateUserRole(userRoleFromLS);
      if (userRoleFromLS == 'User') {
        this.cartService.getCart(parseInt(userIDFromLS!));
      }
    }
  }
}
