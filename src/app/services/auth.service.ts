import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  checkCredentials(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:3000/users?email=${email}&password=${password}`
    );
  }
}
