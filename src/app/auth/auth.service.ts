import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

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

  authorize() {
    this.auth$$.next({ hasAuth: true });
    this.router.navigate(['']);
    console.log('authorized');
  }

  logout() {
    this.auth$$.next({
      ...this.auth$$.value,
      hasAuth: false,
    });
    console.log('logout');
  }

  checkIfHasAuth() {
    return this.auth$.subscribe((authState) => authState.hasAuth);
  }
}
