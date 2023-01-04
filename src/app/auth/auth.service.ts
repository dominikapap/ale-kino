import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { map, tap } from 'rxjs/operators';
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

  checkCredentials(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:3000/users?email=${email}&password=${password}`
    );
  }

  authorize(userID: number) {
    this.auth$$.next({ ...this.auth$$.value, hasAuth: true });
    this.userStateService.updateUserID(userID);
    this.router.navigate(['']);
  }

  logout() {
    this.auth$$.next({
      ...this.auth$$.value,
      hasAuth: false,
    });
    this.userStateService.updateUserID(0);
    alert('wylogowano');
  }

  checkIfHasAuth() {
    let authState;
    this.auth$.subscribe((result) => (authState = result.hasAuth));
    return authState;
    // return true;
  }

  ngOnDestroy() {}
}
