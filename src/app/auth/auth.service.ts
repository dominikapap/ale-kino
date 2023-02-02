import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { UserStateService } from '../core/user-state.service';
import { CartService } from '../domains/cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userStateService = inject(UserStateService);
  private cartService = inject(CartService);

  private auth$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get auth$() {
    return this.auth$$.asObservable();
  }
  constructor() {
    this.setStateFromLocalStorage();
  }
  checkCredentials(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:3000/users?email=${email}&password=${password}`
    );
  }

  authorize(user: User) {
    this.auth$$.next({ ...this.auth$$.value, hasAuth: true });
    this.userStateService.updateUser(user);
    localStorage.setItem('userID', user.userID.toString());
    localStorage.setItem('userName', user.firstName.toString());
    this.router.navigate(['']); //todo change to navigate to page visited before login
  }

  logout() {
    this.userStateService.clearUser();
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    this.cartService.emptyCart();
    this.auth$$.next({
      ...this.auth$$.value,
      hasAuth: false,
    });

    this.router.navigate(['logowanie']);
    alert('wylogowano');
  }

  checkIfHasAuth() {
    let authState;
    this.auth$.subscribe((result) => (authState = result.hasAuth));
    return authState;
  }

  private setStateFromLocalStorage() {
    // naive checking with userID
    const userIDFromLS = localStorage.getItem('userID');
    if (userIDFromLS !== null) {
      this.userStateService.fecthUser(parseInt(userIDFromLS));
      this.auth$$.next({ hasAuth: true });
    }
  }
}
