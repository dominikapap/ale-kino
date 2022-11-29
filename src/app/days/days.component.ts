import { Component, OnInit } from '@angular/core';
import { DatesService } from '../services/dates.service';
import { MoviesService } from '../services/movies.service';

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

loadDayData(elem:number):any{
  this.mymovies = this.movies[elem]
}

compareHours(hour:any):boolean{
  let now = new Date
  if (hour >  `${now.getHours()}:${now.getMinutes()}`){
    return true
  }
else{
  return false
}
}

addToWatchList(title:string){
  this.watchList.push(title)
}

  constructor( private datesService:DatesService, public moviesDetailsService:MoviesService) { 
    this.days = datesService.getDays();
    this.movies = datesService.getMovies();
    this.mymovies = this.movies[0]
    this.movieDetails = moviesDetailsService.getDetails()
    console.log(this.movieDetails)
  }

  ngOnInit(): void {


  }

}
