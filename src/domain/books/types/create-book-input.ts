import { Genre } from "../entities/genre"

export interface CreateBookInput {
  name: string
  genres: Genre[]
  rating: number
}