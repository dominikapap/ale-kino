import { state } from '@angular/animations';
import { createSelector } from '@ngrx/store';
import { ShowingsState } from './showings.state';

const selectShowingsState = (state: { showingsState: ShowingsState }) =>
  state.showingsState;

export const selectShowingsList = createSelector(
  selectShowingsState,
  (state) => state.showingsList
);
