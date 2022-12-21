import { Component, OnInit } from '@angular/core';
import { WatchListService } from '../services/watch-list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent implements OnInit {
  titlesToWatch: string[] = [];

  constructor(private watchListService: WatchListService) {}

  ngOnInit(): void {
    // this.watchListService.currentwatchList$$
    // .subscribe(title => !this.titlesToWatch.includes(title) ? [this.titlesToWatch.push(title), alert(`${title} dodano do listy do obejrzenia`) ]: alert(`${title} jest już na liście`) )
  }

  // removeFromWatchList(x:string){
  // this.titlesToWatch = this.titlesToWatch.filter(t => t !== x)

  // }
}
