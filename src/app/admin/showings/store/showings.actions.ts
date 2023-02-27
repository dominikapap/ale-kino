import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';
import { ShowingForm } from '../addShowings/add-showing.form.service';

export const ShowingsActions = createActionGroup({
  source: 'Showings',
  events: {
    'add new showing': props<MovieShowing>(),
    'get all showings': emptyProps(),
  },
});
export const ShowingsAPIActions = createActionGroup({
  source: 'Showings API',
  events: {
    ['add new showing success']: props<MovieShowing>(),
    ['add new showing failure']: emptyProps(),
    ['get all showings success']: props<{ showingsList: MovieShowing[] }>(),
    ['get all showings failure']: emptyProps(),
  },
});
