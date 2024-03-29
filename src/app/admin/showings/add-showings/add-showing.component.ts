import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';
import { MovieDetails } from '../../../domains/movies/movie-details/MovieDetails.interface';
import { ScreeningHall, ShowingsApiService } from '../showings-api.service';
import { ShowingsActions } from '../store/showings.actions';
import { TimeslotShowingsStateService } from '../timeslot-showings.state.service';
import { AddShowingFormService } from './add-showing.form.service';

@Component({
  selector: 'app-add-showing',
  templateUrl: 'add-showing.component.html',
  styleUrls: ['add-showing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddShowingComponent {
  private addShowingFormService = inject(AddShowingFormService);
  private showingsApiService = inject(ShowingsApiService);
  private store = inject(Store);
  private timeslotShowingsStateService = inject(TimeslotShowingsStateService);
  addShowingForm = this.addShowingFormService.createShowingForm();
  showings$!: Observable<MovieShowing[]>;
  movies$ = this.showingsApiService.getMovies();
  halls$ = this.showingsApiService.getHalls();
  dataForShowing$ = combineLatest([this.movies$, this.halls$]).pipe(
    map(([movies, halls]) => ({ movies, halls }))
  );
  tomorrow = this.addShowingFormService.tomorrow;

  get movieTitleCtrl() {
    return this.addShowingForm.controls.movieTitle;
  }
  get dateCtrl() {
    return this.addShowingForm.controls.date;
  }
  get breakCtrl() {
    return this.addShowingForm.controls.break;
  }
  get hallIdCtrl() {
    return this.addShowingForm.controls.hallId;
  }
  get timeFromCtrl() {
    return this.addShowingForm.controls.timeFrom;
  }

  get timeToCtrl() {
    return this.addShowingForm.controls.timeTo;
  }
  get hallAvailableCtrl() {
    return this.addShowingForm.controls.hallAvailableAfter;
  }
  get rowsCtrl() {
    return this.addShowingForm.controls.rows;
  }
  get columnsCtrl() {
    return this.addShowingForm.controls.columns;
  }

  getShowings() {
    this.showings$ = this.timeslotShowingsStateService.timeslotShowings$;
  }

  setTimeCtrlValues(movies: MovieDetails[]) {
    this.addShowingFormService.setTimeToValue(
      movies,
      this.movieTitleCtrl.value,
      this.timeToCtrl,
      this.timeFromCtrl
    );
    this.addShowingFormService.setHallAvailableValue(
      this.hallAvailableCtrl,
      this.timeToCtrl,
      this.breakCtrl
    );
  }

  addShowing(movies: MovieDetails[]) {
    this.addShowingForm.markAllAsTouched();
    this.addShowingFormService.setControlsValues(
      movies,
      this.movieTitleCtrl.value,
      this.timeToCtrl,
      this.timeFromCtrl,
      this.hallAvailableCtrl,
      this.breakCtrl,
      this.dateCtrl
    );

    this.store.dispatch(
      ShowingsActions.addNewShowing(this.addShowingForm.getRawValue())
    );
    this.addShowingForm.reset();
  }

  updateMovieId(event: { value: string }, movies: MovieDetails[]) {
    this.addShowingFormService.updateMovieId(
      event,
      movies,
      this.addShowingForm
    );
  }
  updateRowsAndColumns(event: { value: string }, halls: ScreeningHall[]) {
    this.addShowingFormService.updateRowsAndColumns(
      event,
      halls,
      this.addShowingForm
    );
  }
}
