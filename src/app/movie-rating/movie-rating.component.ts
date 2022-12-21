import { Component, Input, OnInit } from '@angular/core';
import { Ratings } from '../interfaces/MovieRating';
import { MovieRatingService } from './movie-rating.service';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css'],
})
export class MovieRatingComponent implements OnInit {
  @Input() movieId = 0;

  movieRatings: Ratings[] = [];
  currentRating: number = 0;
  userID: number = 168396; //tymczasowe
  showRatingForm: boolean = false;

  constructor(private movieRatingService: MovieRatingService) {}

  ngOnInit(): void {
    if (this.movieId) {
      this.movieRatingService.getMovieRating(this.movieId).subscribe({
        next: (response) => {
          this.movieRatings = response[0].ratings;
          this.getCurrentRating(this.movieRatings);
        },
      });
    }
  }
  getCurrentRating(ratings: Ratings[]) {
    ratings.forEach((element: Ratings) => {
      this.currentRating += element.rating;
    });
    this.currentRating /= ratings.length;
  }
  checkIfUserRated(userID: number) {
    if (this.movieRatings.length) {
      return this.movieRatings.filter(
        (element: Ratings) => element.userID == userID
      ).length;
    } else {
      return 0;
    }
  }
  rateMovie(userID: number) {
    console.log(userID);
  }
}
