import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Repertoire } from './showings.component';

@Injectable({
  providedIn: 'root',
})
export class ShowingsApiService {
  private http = inject(HttpClient);

  getForToday(date: string) {
    const now = new Date();
    const currHour = now.getHours();
    const currMinutes = now.getMinutes();
    return this.http.get<Repertoire[]>(
      `/showings?date_like=${date}&timeFrom_gte=${currHour}:${currMinutes}`
    );
  }
  getForDate(date: string) {
    return this.http.get<Repertoire[]>(`/showings?date_like=${date}`);
  }
}
