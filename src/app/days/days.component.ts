import { Component, OnInit } from '@angular/core';
import { DatesService } from '../services/dates.service';
import { MoviesService } from '../services/movies.service';
import { WatchListService } from '../services/watch-list.service';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})


export class DaysComponent implements OnInit {



days:string[];
movies:object[]=[]
mymovies:any;
movieDetails:any[];
watchList:string[]=[];
showMore:boolean = false;
titlesToWatch:string[]=[];

loadDayData(elem:number):any{
  this.mymovies = this.movies[elem]
}

compareHours(hour:string):boolean{
  let now = new Date
  if (hour >  `${now.getHours()}:${now.getMinutes()}`){
    return true
  }
  else{
    return false
  }
}



  constructor( private datesService:DatesService, public moviesDetailsService:MoviesService, private watchListService:WatchListService) { 
    this.days = datesService.getDays();
    this.movies = datesService.getMovies();
    this.mymovies = this.movies[0]
    this.movieDetails = moviesDetailsService.getDetails()
    console.log(this.movieDetails)
  }

  ngOnInit(): void {
   // this.watchListService.currentwatchList$$.subscribe(title => this.titlesToWatch.push(title))
}

toggleMoreLess(labelFor:string){
  let label = document.querySelector(`label[for=${labelFor}]>span`) as HTMLElement;
  label.innerText == "Więcej" ? label.innerText = "Mniej" : label.innerText = "Więcej" ;

}

newWatchList(title:string){
  this.watchListService.changewatchList(title)
}
}
