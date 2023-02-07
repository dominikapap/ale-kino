import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AuthStateService } from '../auth';
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

  userTest: User = {
    userID: 22,
    firstName: 'frfre',
    lastName: 'fefef',
    email: '',
    password: '',
    phoneNumber: 0,
    role: 'Guest',
  };

  constructor() {
    const userIDFromLS = localStorage.getItem('userID');
    console.log(userIDFromLS);

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

  getUserInfo() {
    return this.user$$.value;
  }

  getUserID() {
    return this.user$$.value.userID;
  }

  getUserName() {
    return this.user$$.value.firstName;
  }

  fetchUser(userID: number) {
    this.http
      .get<User[]>(`http://localhost:3000/users?userID=${userID}`)
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
    console.log(this.user$$.value);
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
