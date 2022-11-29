import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  constructor() {
    watchList: string[]=[]
   }
}
