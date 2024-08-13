import { ObjectId } from "bson";
import { BookRepository } from "../repositories/book.repository";
import { Book } from "../entities/book";

export class DeleteBookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async deleteBook(id: ObjectId): Promise<Book> {
    const book = await this.bookRepository.findById(id)
    await this.bookRepository.delete(id)

    return book
  }
}