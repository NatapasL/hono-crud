import { ObjectId } from "bson";
import { Genre } from "../entities/genre";

export interface UpdateBookInput {
  id: ObjectId
  name?: string
  genres?: Genre[]
  rating?: number
}