import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class DatesService {

  
  constructor() { }

  getNextWeek(){
      let dayOne = new Date()
      let newDate = new Date();
      let dayTwo = new Date(newDate.setDate(newDate.getDate() + 1))
      let dayThree = new Date(newDate.setDate(dayTwo.getDate() + 1))
      let dayFour = new Date(newDate.setDate(dayThree.getDate() + 1))
      let dayFive = new Date(newDate.setDate(dayFour.getDate() + 1))
      let daySix = new Date(newDate.setDate(dayFive.getDate() + 1))
      let daySeven = new Date(newDate.setDate(daySix.getDate() + 1))
      return [dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven]
  }

 

  daysData =
    [{
      date:'29.11.2022', 
      movies:[{
        title: "Apokawixa",
        id:1, 
        hours:["12:30", "15:00", "21:00"]}, 
        {
        title: "Soul",
        id:2, 
        hours:["12:45", "16:00", "20:30"]},], 
    }, {
      date:'30.11.2022', 
      movies:[{
        title: "Apokawixa2",
        id:1, 
        hours:["12:00", "17:00", "20:00"]}, 
        {
        title: "Soul2",
        id:2, 
        hours:["12:15", "18:00", "21:30"]},], 
    },{
      date: '01.12.2022', 
      movies:[{
        title: "Apokawixa",
        id:1, 
        hours:["12:30", "15:00", "21:00"]}, 
        {
        title: "Soul",
        id:2, 
        hours:["12:45", "16:00", "20:30"]},], 
    },{
      date: '02.12.2022', 
      movies:[{
        title: "Apokawixa",
        id:1, 
        hours:["12:30", "15:00", "21:00"]}, 
        {
        title: "Soul",
        id:2, 
        hours:["12:45", "16:00", "20:30"]},], 
    },{
      date:'03.12.2022', 
      movies:[{
        title: "Apokawixa",
        id:1, 
        hours:["12:30", "15:00", "21:00"]}, 
        {
        title: "Soul",
        id:2, 
        hours:["12:45", "16:00", "20:30"]},], 
    },{
      date: '04.12.2022', 
      movies:[{
        title: "Apokawixa",
        id:1, 
        hours:["12:30", "15:00", "21:00"]}, 
        {
        title: "Soul",
        id:2, 
        hours:["12:45", "16:00", "20:30"]},], 
    },]
  
  dates: any=[]
  movies: any=[]

  getDays(){
    for(let i=0; i< this.daysData.length; i++){
      this.dates.push( this.daysData[i].date)
    }
    return this.dates}
  
  getMovies(){
    for(let i=0; i< this.daysData.length; i++){
      this.movies.push( this.daysData[i].movies)
    }
    return this.movies
  }
  
  
}
