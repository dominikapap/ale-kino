import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { WatchListService } from './watch-list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchListComponent {
  watchlist: string[] = [];

  titles$ = inject(WatchListService).watchList$;
  watchListService = inject(WatchListService);

  onRemoveFromWatchList(titleId: number) {
    this.watchListService.removeFromWatchlist(titleId);
  }
}
