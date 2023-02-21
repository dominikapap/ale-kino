import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

export interface ShowingsState {
  showingsList: MovieShowing[];
}

export const showingsFeatureKey = 'showingsState';

export const initialShowingsState: ShowingsState = {
  showingsList: [],
};
