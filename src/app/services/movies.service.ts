import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }


movies= [
  {
    title: "Apokawixa",
    id:1,
    image: "https://fwcdn.pl/fpo/55/10/10015510/8029347.6.jpg",
    genres : ["Horror"],
    time: "120 minut",
    ageRestriction: "PG-13",
    description:" Apokawixa details:Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis dictum turpis, ut viverra orci. In malesuada, diam in consequat malesuada, enim purus faucibus ex, condimentum vulputate mauris ex vel massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis dictum turpis, ut viverra orci. In malesuada, diam in consequat malesuada, enim purus faucibus ex, condimentum vulputate mauris ex vel massa."
  },
  {
    title: "Co w duszy gra",
    id:2,
    image: "https://fwcdn.pl/fpo/66/50/836650/7934792.6.jpg",
    genres : ["Animowany", "Obyczajowy"],
    time: "120 minut",
    ageRestriction: "Dla wszystkich",
    description:"  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis dictum turpis, ut viverra orci. In malesuada, diam in consequat malesuada, enim purus faucibus ex, condimentum vulputate mauris ex vel massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis dictum turpis, ut viverra orci. In malesuada, diam in consequat malesuada, enim purus faucibus ex, condimentum vulputate mauris ex vel massa."
  }
]


getMovie(movieId:number){
  console.log(this.movies.find(obj => obj.id === movieId))
    return this.movies.find(obj => obj.id === movieId);
}

getDetails(){
  return this.movies
}
}

