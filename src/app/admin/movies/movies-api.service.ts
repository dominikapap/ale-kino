import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from '../../domains/movies/movie-details/MovieDetails.interface';

interface Genre {
  id: number;
  name: string;
}
interface ageRestriction {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private http = inject(HttpClient);

  getGenres$(): Observable<Genre[]> {
    return this.http.get<Genre[]>('/genres?_sort=name&_order=asc');
  }
  getAgeRestrictions$(): Observable<ageRestriction[]> {
    return this.http.get<ageRestriction[]>('/ageRestrictions');
  }

  add(movieData: MovieDetails) {
    return this.http.post<MovieDetails>('/movies', {
      title: movieData.title,
      imageUrl: movieData.imageUrl,
      genres: movieData.genres,
      ageRestriction: movieData.ageRestriction,
      descriptionShort: movieData.descriptionShort,
      descriptionLong: movieData.descriptionLong,
      duration: movieData.duration,
      isPremere: movieData.isPremiere,
      id: movieData,
    });
  }

  getMovies() {
    return this.http.get<MovieDetails[]>(`/movies`);
  }
}
