import { createActionGroup, props } from '@ngrx/store';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

export const ShowingsActions = createActionGroup({
  source: 'Showings',
  events: {
    'add new showing': props<MovieShowing>(),
    'get all showings': props<{ showingsList: MovieShowing[] }>(),
    'remove showing': props<{ id: number }>(),
  },
});
