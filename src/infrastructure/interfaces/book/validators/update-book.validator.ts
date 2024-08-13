import { IsEnum, IsOptional, Max, Min } from "class-validator"
import { Genre } from "../../../../domain/books/entities/genre"

export class UpdateBookValidator {
  @IsOptional()
  name?: string

  @IsEnum(Genre, { each: true })
  @IsOptional()
  genres?: Genre[]

  @Min(0)
  @Max(10)
  @IsOptional()
  rating?: number
}