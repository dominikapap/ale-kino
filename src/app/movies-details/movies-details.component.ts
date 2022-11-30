import { Component, OnInit } from '@angular/core';
import { DatesService } from '../services/dates.service';
import { MoviesService } from '../services/movies.service';

interface Movie {
  title: string;
  id: number;
  image: string;
  genres: string[];
  time: string | number;
  ageRestriction: string;
  description: string
}


@Component({
  selector: 'app-movies-details',
  //templateUrl: './movies-details.component.html',
  template: "hello",
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {
   constructor(private moviesService:MoviesService, private datesService:DatesService) { 
    let now = new Date
   // this.movies = this.moviesService.getMovies();
    
   }

  showMore():void{
  
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
  

  movies: Movie[] =[]
  dates: any = []
  days:any;

  

  ngOnInit(): void {

    //for(let i=0; i< this.days.length; i++){
     // this.dates.push(Object.keys(this.days[i]))
   // }



  }

}