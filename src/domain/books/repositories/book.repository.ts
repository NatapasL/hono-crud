import { ObjectId } from "bson";
import { Book } from "../entities/book";

export interface BookRepository {
  create: (book: Book) => Promise<Book>
  findAll: () => Promise<Book[]>
  update: (book: Book) => Promise<Book>
  findById: (id: ObjectId) => Promise<Book>
  delete: (id: ObjectId) => Promise<void>
}