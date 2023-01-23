import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private user$$ = new BehaviorSubject<{ userID: number; userName: string }>({
    userID: 0,
    userName: '',
  });

  get user$() {
    return this.user$$.asObservable();
  }

  get userId$() {
    return this.user$.pipe(map((user) => user.userID));
  }

  get userName$() {
    return this.user$.pipe(map((user) => user.userName));
  }

  getUserID() {
    let userID!: number;
    this.user$$.subscribe((result) => (userID = result.userID));
    return userID;
  }

  getUserName() {
    let userName!: string;
    this.user$$.subscribe((result) => (userName = result.userName));
    return userName;
  }

  updateUser(id: number, name: string) {
    this.user$$.next({ ...this.user$$.value, userID: id, userName: name });
  }
}
