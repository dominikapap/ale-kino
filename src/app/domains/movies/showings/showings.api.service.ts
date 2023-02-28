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
    let padStart;
    currHour < 10 ? (padStart = 0) : (padStart = '');
    const currMinutes = now.getMinutes();
    return this.http.get<Repertoire[]>(
      `/showings?date_like=${date}&timeFrom_gte=${padStart}${currHour}:${currMinutes}`
    );
  }
  getForDate(date: string) {
    return this.http.get<Repertoire[]>(`/showings?date_like=${date}`);
  }
}
