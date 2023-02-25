/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { ShowingsAPIActions } from './showings.actions';
import { initialShowingsState } from './showings.state';

export const showingsReducer = createReducer(
  initialShowingsState,

  on(ShowingsAPIActions.addNewShowingSuccess, (state, action) => {
    return { ...state, showingsList: [...state.showingsList, action] };
  }),
  on(ShowingsAPIActions.getAllShowingsSuccess, (state, { showingsList }) => ({
    ...state,
    showingsList: [...state.showingsList, ...showingsList],
  }))
);
