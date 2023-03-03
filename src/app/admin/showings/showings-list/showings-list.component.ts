import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { ShowingsApiService } from '../showings-api.service';
import { ShowingsActions } from '../store/showings.actions';
import { selectShowingsList } from '../store/showings.selector';

type FilterForm = FormGroup<{
  title: FormControl<string>;
  hall: FormControl<string>;
}>;

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

  filterForm: FilterForm = this.builder.group({
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
}
