import { Component, inject, OnInit } from '@angular/core';
import { WatchListService } from './watch-list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent {
  watchlist: string[] = [];

  titles$ = inject(WatchListService).watchList$;
  watchListService = inject(WatchListService);

  onRemoveFromWatchList(titleId: number) {
    this.watchListService.removeFromWatchlist(titleId);
  }
}
