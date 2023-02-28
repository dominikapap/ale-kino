import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TicketType {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private http = inject(HttpClient);

  getMovieApiDataTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`/ticketTypes`);
  }
}
