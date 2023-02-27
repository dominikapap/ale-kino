/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { MoviesApiService } from '../movies-api.service';
import { MoviesActions, MoviesAPIActions } from './movies.actions';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private moviesApiService = inject(MoviesApiService);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);

  addMovieEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.addNewMovie),
      exhaustMap((action) =>
        this.moviesApiService.add(action).pipe(
          catchError((error) => {
            this.snackBarService.openSnackBar(
              'Akcja nie powiodła sie, spróbuj ponownie później',
              3000
            );
            return throwError(() => new Error(error));
          })
        )
      ),
      map((movie) => {
        this.snackBarService.openSnackBar(
          'Film pomyślnie dodano do bazy',
          5000,
          ['green-snackbar']
        );
        this.router.navigate(['admin/movies/movies-list']);
        return MoviesAPIActions.addNewMovieSuccess(movie);
      })
    );
  });

  getMoviesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.getAllMovies),
      exhaustMap(() =>
        this.moviesApiService.getMovies().pipe(
          catchError((error) => {
            this.snackBarService.openSnackBar(
              'Akcja nie powiodła sie, spróbuj ponownie później',
              3000
            );
            return throwError(() => new Error(error));
          })
        )
      ),
      map((movies) =>
        MoviesAPIActions.getAllMovieSuccess({ moviesList: movies })
      )
    );
  });
}
