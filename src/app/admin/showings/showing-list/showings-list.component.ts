import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';
import { ShowingsApiService } from '../showings-api.service';
import { ShowingsActions } from '../store/showings.actions';
import { selectShowingsList } from '../store/showings.selector';

@Component({
  selector: 'app-showings-list',
  templateUrl: 'showings-list.component.html',
  styles: [
    `
      :host {
        padding-top: 130px;
      }
      p {
        line-height: 2;
      }
      .showing-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(350px, 80vw), 1fr));
        gap: 2rem;
      }

      li {
        border: 2px solid white;
        padding: 0.5rem;
        border-radius: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowingsListComponent implements OnInit {
  private store = inject(Store);
  private showingsApiService = inject(ShowingsApiService);
  private builder = inject(NonNullableFormBuilder);
  showings$ = this.store.select(selectShowingsList);
  allShowings$ = this.showings$;
  movies$ = this.showingsApiService.getMovies();
  halls$ = this.showingsApiService.getHalls();
  dataForShowing$ = combineLatest([this.movies$, this.halls$]).pipe(
    map(([movies, halls]) => ({ movies, halls }))
  );

  filterForm = this.builder.group({
    title: this.builder.control('Wszystkie'),
    hall: this.builder.control('Wszystkie'),
  });

  get hallCtrl() {
    return this.filterForm.controls.hall;
  }
  get titleCtrl() {
    return this.filterForm.controls.title;
  }
  ngOnInit() {
    this.store.dispatch(ShowingsActions.getAllShowings());
  }

  filterByTitle(ctrlValue: string | null) {
    if (ctrlValue && ctrlValue !== 'Wszystkie') {
      this.showings$ = this.allShowings$.pipe(
        map((result) => result.filter((item) => item.movieTitle == ctrlValue)),
        map((result: MovieShowing[]) =>
          this.hallCtrl.value == 'Wszystkie'
            ? result
            : result.filter(
                (item) => item.hallId.toString() == this.hallCtrl.value
              )
        )
      );
    } else {
      this.showings$ = this.allShowings$;
    }
  }

  filterByHall(ctrlValue: string | null) {
    if (ctrlValue && ctrlValue.toString() !== 'Wszystkie') {
      this.showings$ = this.allShowings$.pipe(
        map((result) =>
          result.filter((item) => item.hallId.toString() == ctrlValue)
        )
      );
    } else {
      this.showings$ = this.allShowings$;
    }
  }
}
