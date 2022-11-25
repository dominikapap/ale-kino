import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

interface Movie {
  title: string;
  image: string;
  genres: string[];
  time: string | number;
  ageRestriction: string;
  description: string;
  hours: string[]
}


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
   constructor(private moviesService:MoviesService) { 
    this.movies = this.moviesService.getMovies();
    
   }

  showMore():void{
  
  }

  movies: Movie[]=[]

  newDate = new Date()
  dayOne = new Date()

  dayTwo = new Date(this.newDate.setDate(this.newDate.getDate() + 1))

  dayThree = new Date(this.newDate.setDate(this.dayTwo.getDate() + 1))

  dayFour = new Date(this.newDate.setDate(this.dayThree.getDate() + 1))
  dayFive = new Date(this.newDate.setDate(this.dayFour.getDate() + 1))
  daySix = new Date(this.newDate.setDate(this.dayFive.getDate() + 1))
  daySeven = new Date(this.newDate.setDate(this.daySix.getDate() + 1))
  
  dates = [ this.dayOne, this.dayTwo, this.dayThree, this.dayFour, this.dayFive,this.daySix, this.daySeven ]
  
 
  

 
  ngOnInit(): void {

   

    
  }

}
