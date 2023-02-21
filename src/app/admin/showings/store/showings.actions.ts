import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

export const ShowingsActions = createActionGroup({
  source: 'Showings',
  events: {
    'add new showing': props<MovieShowing>(),
    'get all showings': props<{ showingsList: MovieShowing[] }>(),
  },
});
export const ShowingsAPIActions = createActionGroup({
  source: 'Showings API',
  events: {
    ['add new showing success']: props<MovieShowing>(),
    ['add new showing failure']: emptyProps(),
  },
});
