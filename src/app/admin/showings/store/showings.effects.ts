import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShowingsActions } from './showings.actions';

@Injectable()
export class ShowingsEffects {
  private actions$ = inject(Actions);

  addShowingEffect$ = createEffect(
    () => {
      return this.actions$.pipe(ofType(ShowingsActions.addNewShowing));
    },
    { dispatch: false }
  );
}
