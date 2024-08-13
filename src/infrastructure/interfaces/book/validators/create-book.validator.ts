import { IsArray, IsEnum, Max, Min } from "class-validator"
import { Genre } from "../../../../domain/books/entities/genre"

export class CreateBookValidator {
  name!: string

  @IsEnum(Genre, { each: true })
  genres!: Genre[]

  @Min(0)
  @Max(10)
  rating!: number
}