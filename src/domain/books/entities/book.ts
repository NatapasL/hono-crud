import { ObjectId } from "bson";
import { Genre } from "./genre";

export interface BookConstructorInput {
  id?: ObjectId
  name: string
  genres: Genre[]
  rating: number
}

export class Book {
  readonly id!: ObjectId

  name!: string
  rating!: number

  private _genres!: Genre[]

  constructor(input: BookConstructorInput) {
    this.id = input.id ?? new ObjectId()
    this.name = input.name
    this._genres = input.genres
    this.rating = input.rating
  }

  get genres(): Genre[] {
    return [...this._genres]
  }

  setGenres(genres: Genre[]): void {
    this._genres = [...genres]
  }
}