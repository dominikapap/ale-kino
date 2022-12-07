import { BookedSeat } from "./BookesSeats"
import { PaidSeat } from "./PaidSeats"

export interface MovieShowing {
    id: number
    movieId: number
    date: string
    break: number
    timeFrom: string
    timeTo: string
    rows: number
    columns: number
    numOfSeats: number
    hallId: number
    paidSeats: PaidSeat[]
    bookedSeats: BookedSeat[]
  }
  