import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from './User.interface';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private http = inject(HttpClient);
  private user$$ = new BehaviorSubject<User>({
    userID: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
    role: 'Guest',
  });

  constructor() {
    const userIDFromLS = localStorage.getItem('userID');

    if (userIDFromLS && parseInt(userIDFromLS) > 0) {
      this.fetchUser(parseInt(userIDFromLS));
    }
  }

  get user$() {
    return this.user$$.asObservable();
  }

  get userId$() {
    return this.user$.pipe(map((user) => user.userID));
  }

  get userName$() {
    return this.user$.pipe(map((user) => user.firstName));
  }
  get userRole$() {
    return this.user$.pipe(map((user) => user.role));
  }

  updateUserRole(userRole: User['role']) {
    this.user$$.next({ ...this.user$$.value, role: userRole });
  }
  getUserInfo() {
    return this.user$$.value;
  }
  getUserRole(userID: number) {
    return this.http
      .get<User[]>(`/users?userID=${userID}`)
      .pipe(map((user) => user[0]));
  }

  getUserID() {
    return this.user$$.value.userID;
  }

  getUserName() {
    return this.user$$.value.firstName;
  }

  fetchUser(userID: number) {
    this.http
      .get<User[]>(`/users?userID=${userID}`)
      .pipe(
        map((user) => user[0]),
        tap({ next: (result) => this.updateUser(result) })
      )
      .subscribe();
  }

  updateUser(user: User) {
    this.user$$.next({
      userID: user.userID,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
  }

  clearUser() {
    this.user$$.next({
      ...this.user$$.value,
      userID: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: 0,
      role: 'Guest',
    });
  }
}
