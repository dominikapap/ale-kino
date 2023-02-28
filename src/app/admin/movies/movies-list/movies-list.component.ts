import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesActions } from '../store/movies.actions';
import { selectMoviesList } from '../store/movies.selector';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent implements OnInit {
  private store = inject(Store);
  movies$ = this.store.select(selectMoviesList);

  ngOnInit() {
    this.store.dispatch(MoviesActions.getAllMovies());
  }
}
