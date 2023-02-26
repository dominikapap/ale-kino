import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WatchListStateService } from './watch-list.state.service';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  templateUrl: './watch-list.component.html',
  styleUrls: [],
  imports: [NgIf, NgFor, MatButtonModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WatchListComponent {
  watchlist: string[] = [];

  titles$ = inject(WatchListStateService).watchList$;
  watchListStateService = inject(WatchListStateService);

  onRemoveFromWatchList(titleId: string) {
    this.watchListStateService.removeFromWatchlist(titleId);
  }
}
