import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShowingsActions } from '../store/showings.actions';
import { selectShowingsList } from '../store/showings.selector';

@Component({
  selector: 'app-showings-list',
  template: `
    <ng-container *ngIf="showings$ | async as showings; else listEmpty">
      <h1 class="text-3xl font-bold  pb-1">Lista nadchodzących seansów</h1>
      <a routerLink="/admin/showings/add-showing" class="text-xl inline-flex"
        >Dodaj nowy seans <mat-icon class="ml-2 text-lg">create</mat-icon></a
      >
      <ol class="pl-2 showing-list mt-4">
        <li *ngFor="let showing of showings">
          <app-showings-list-item [showing]="showing"></app-showings-list-item>
        </li>
      </ol>
    </ng-container>
    <ng-template #listEmpty
      ><p>
        Nie udało się załadować danych, spróbuj ponwnie później
      </p></ng-template
    >
  `,
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
      li p:not(:last-child) {
        border-bottom: dashed 1px white;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowingsListComponent {
  private store = inject(Store);

  showings$ = this.store.select(selectShowingsList);

  ngOnInit() {
    this.store.dispatch(ShowingsActions.getAllShowings());
  }
}
