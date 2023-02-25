import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

@Injectable({
  providedIn: 'root',
})
export class ShowingDetailsApiService {
  private http = inject(HttpClient);

  getShowingDetails(showingId: number): Observable<MovieShowing> {
    return this.http
      .get<MovieShowing[]>(`/showings?id=${showingId}`)
      .pipe(map((result) => result[0]));
  }
}
