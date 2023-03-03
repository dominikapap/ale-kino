import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
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
  showings$ = this.store.select(selectShowingsList);
  allShowings$ = this.showings$;

  ngOnInit() {
    this.store.dispatch(ShowingsActions.getAllShowings());
  }
}
