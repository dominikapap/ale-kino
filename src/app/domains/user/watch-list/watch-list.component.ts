import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WatchListStateService } from './watch-list.state.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchListComponent {
  watchlist: string[] = [];

  titles$ = inject(WatchListStateService).watchList$;
  watchListStateService = inject(WatchListStateService);

  onRemoveFromWatchList(titleId: string) {
    this.watchListStateService.removeFromWatchlist(titleId);
  }
}
