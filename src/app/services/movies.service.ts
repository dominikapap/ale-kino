import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }

  getMovies(){
    return [
      {
        title: "Apokawixa",
        image: "https://fwcdn.pl/fpo/55/10/10015510/8029347.6.jpg",
        genres : ["Horror"],
        time: "120 minut",
        ageRestriction: "PG-13",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis dictum turpis, ut viverra orci. In malesuada, diam in consequat malesuada, enim purus faucibus ex, condimentum vulputate mauris ex vel massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis dictum turpis, ut viverra orci. In malesuada, diam in consequat malesuada, enim purus faucibus ex, condimentum vulputate mauris ex vel massa.",
        hours:["12:30", "15:00", "21:00"]
      },
      {
        title: "Co w duszy gra",
        image: "https://fwcdn.pl/fpo/66/50/836650/7934792.6.jpg",
        genres : ["Animowany", "Obyczajowy"],
        time: "120 minut",
        ageRestriction: "Dla wszystkich",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis dictum turpis, ut viverra orci. In malesuada, diam in consequat malesuada, enim purus faucibus ex, condimentum vulputate mauris ex vel massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis dictum turpis, ut viverra orci. In malesuada, diam in consequat malesuada, enim purus faucibus ex, condimentum vulputate mauris ex vel massa.",
        hours:["12:30", "15:00", "21:00"]
      }
    ]
  }
}
