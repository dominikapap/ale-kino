import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketType } from '../../../shared/interfaces/TicketType';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private http = inject(HttpClient);

  getMovieApiDataTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`/ticketTypes`);
  }
}
