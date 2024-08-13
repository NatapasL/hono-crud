import { Book } from "../entities/book";
import { BookRepository } from "../repositories/book.repository";
import { UpdateBookInput } from "../types/update-book-input";

export class UpdateBookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async updateBook(input: UpdateBookInput): Promise<Book> {
    const book = await this.bookRepository.findById(input.id)

    if (input.genres?.length) {
      book.setGenres(input.genres)
    }
    if (input.name?.length) {
      book.name = input.name
    }
    if (typeof input.rating == 'number') {
      book.rating = input.rating
    }

    return await this.bookRepository.update(book)
  }
}