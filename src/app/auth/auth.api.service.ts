import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './User.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  checkCredentials(email: string, password: string) {
    return this.http.get<User[]>(`/users?email=${email}&password=${password}`);
  }
}
