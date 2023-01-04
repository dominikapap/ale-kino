import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private user$$ = new BehaviorSubject<{ userID: number }>({ userID: 0 });

  get user$() {
    return this.user$$.asObservable();
  }

  getUserID() {
    let userID!: number;
    this.user$$.subscribe((result) => (userID = result.userID));
    return userID;
  }

  updateUserID(id: number) {
    this.user$$.next({ ...this.user$$, userID: id });
  }
}
