import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../interfaces/User';

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
    password: '',
    phoneNumber: 0,
    role: 'Guest',
  });

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

  //poprawić!!!
  getUserID() {
    let userID!: number;
    this.user$$.subscribe((result) => (userID = result.userID));
    return userID;
  }

  //poprawić!!!
  getUserName() {
    let userName!: string;
    this.user$$.subscribe((result) => (userName = result.firstName));
    return userName;
  }

  fecthUser(userID: number) {
    return this.http
      .get<User[]>(`http://localhost:3000/users?userID=${userID}`)
      .pipe(
        map((user) => user[0]),
        tap({ next: (result) => this.updateUser(result) })
      )
      .subscribe();
  }

  updateUser(user: User) {
    this.user$$.next({
      ...this.user$$.value,
      userID: user.userID,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
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
