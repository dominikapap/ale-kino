import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';
import { MovieDetails } from '../../../domains/movies/movie-details/MovieDetails.interface';
import { ScreeningHall, ShowingsApiService } from '../showings-api.service';
import { ShowingsActions } from '../store/showings.actions';
import { AddShowingFormService } from './add-showing.form.service';

@Component({
  selector: 'app-add-showing',
  templateUrl: 'add-showing.component.html',
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
      }
      .option-img {
        height: 150px;
        width: auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddShowingComponent {
  private addShowingFormService = inject(AddShowingFormService);
  private showingsApiService = inject(ShowingsApiService);
  private store = inject(Store);
  addShowingForm = this.addShowingFormService.createShowingForm();
  showings$!: Observable<MovieShowing[]>;
  movies$ = this.showingsApiService.getMovies();
  halls$ = this.showingsApiService.getHalls();

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
    this.showings$ = this.showingsApiService.getShowingsWithParams(
      this.addShowingForm.getRawValue()
    );
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
    console.log(this.addShowingForm.value);
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
