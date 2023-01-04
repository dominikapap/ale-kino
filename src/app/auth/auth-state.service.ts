import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { UserStateService } from '../core/user-state.service';

interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userStateService = inject(UserStateService);

  private auth$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get auth$() {
    return this.auth$$.asObservable();
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>('http://localhost:3000/login', {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        tap({
          next: (res) => {
            console.log(res);
            const { accessToken, user } = res;
            this.auth$$.next({ hasAuth: true });
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            this.router.navigate(['']);
          },
          error: () => {
            alert('error');
          },
        })
      );
  }
}
