import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { UserStateService } from '../core/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userStateService = inject(UserStateService);

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

  authorize(userID: number, userName: string) {
    this.auth$$.next({ ...this.auth$$.value, hasAuth: true });
    this.userStateService.updateUser(userID, userName);
    localStorage.setItem('userID', userID.toString());
    localStorage.setItem('userName', userName.toString());
    this.router.navigate(['']); //todo change to navigate to page visited before login
  }

  logout() {
    this.userStateService.updateUser(0, '');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
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
    // return true;
  }

  private setStateFromLocalStorage() {
    // naive checking with userID
    if (localStorage.getItem('userID')) {
      this.auth$$.next({ hasAuth: true });
    }

    const userIDFromLS = localStorage.getItem('userID');
    const userNameFromLS = localStorage.getItem('userName');

    if (userIDFromLS && userNameFromLS) {
      this.userStateService.updateUser(parseInt(userIDFromLS), userNameFromLS);
    }
  }
}
