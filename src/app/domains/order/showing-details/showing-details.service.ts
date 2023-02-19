import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

interface ShowingDetails {
  id: number;
  movieTitle: string;
  date: string;
  timeFrom: string;
}
@Injectable({
  providedIn: 'root',
})
export class ShowingDetailsService {
  private http = inject(HttpClient);

  getShowingDetails(showingId: number) {
    return this.http
      .get<MovieShowing[]>(`/showings?id=${showingId}`)
      .pipe(map((result) => result[0]));
  }
}
