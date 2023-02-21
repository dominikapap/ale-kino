/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { ShowingsActions } from './showings.actions';
import { initialShowingsState } from './showings.state';

export const showingsReducer = createReducer(
  initialShowingsState,

  on(ShowingsActions.addNewShowing, (state, action) => {
    return { ...state, showingsList: [...state.showingsList, action] };
  }),
  on(ShowingsActions.getAllShowings, (state, { showingsList }) => ({
    ...state,
    showingsList: [...state.showingsList, ...showingsList],
  }))
);
