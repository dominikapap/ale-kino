/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ShowingsApiService } from '../showings-api.service';
import { ShowingsActions, ShowingsAPIActions } from './showings.actions';

@Injectable()
export class ShowingsEffects {
  private actions$ = inject(Actions);
  private showingsApiService = inject(ShowingsApiService);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);

  addShowingEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShowingsActions.addNewShowing),
      exhaustMap((action) =>
        this.showingsApiService.add(action).pipe(
          catchError((error) => {
            this.snackBarService.openSnackBar(
              'Akcja nie powiodła sie, spróbuj ponownie później',
              3000
            );
            return throwError(() => new Error(error));
          })
        )
      ),
      map((movieShowing) => {
        this.snackBarService.openSnackBar(
          'Seans pomyślnie dodano do bazy',
          5000,
          ['green-snackbar']
        );
        this.router.navigate(['admin/showings/showings-list']);
        return ShowingsAPIActions.addNewShowingSuccess(movieShowing);
      })
    );
  });

  getShowingEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShowingsActions.getAllShowings),
      exhaustMap(() =>
        this.showingsApiService.getShowings().pipe(
          catchError((error) => {
            this.snackBarService.openSnackBar(
              'Akcja nie powiodła sie, spróbuj ponownie później',
              3000
            );
            return throwError(() => new Error(error));
          })
        )
      ),
      map((showings) =>
        ShowingsAPIActions.getAllShowingsSuccess({ showingsList: showings })
      )
    );
  });
}
