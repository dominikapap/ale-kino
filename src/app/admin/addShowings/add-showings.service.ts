import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, tap } from 'rxjs';
import { MovieShowing } from '../../shared/interfaces/MovieShowing';
import { AddShowingsApiService } from './add-showings-api.service';
import { ShowingsActions } from './store/showings.actions';

@Injectable({
  providedIn: 'root',
})
export class AddShowingsService {
  private showingsApiService = inject(AddShowingsApiService);
  private showingsStore = inject<Store<MovieShowing[]>>(Store);

  add(formValue: MovieShowing) {
    this.showingsApiService.add(formValue).subscribe({
      next: (result) => {
        this.showingsStore.dispatch(ShowingsActions.addNewShowing(result));
      },
    });
  }
  getShowings() {
    this.showingsApiService.getShowings().subscribe({
      next: (showingsList) =>
        this.showingsStore.dispatch(
          ShowingsActions.getAllShowings({ showingsList })
        ),
    });
  }
}
