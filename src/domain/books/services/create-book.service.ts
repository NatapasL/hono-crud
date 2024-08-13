import { Book } from "../entities/book";
import { BookRepository } from "../repositories/book.repository";
import { Genre } from "../entities/genre";
import { CreateBookInput } from "../types";

export class CreateBookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async createBook(input: CreateBookInput): Promise<Book> {
    const genres = input.genres.filter<Genre>((genre): genre is Genre => genre in Genre)

    const book = new Book({ name: input.name, genres: genres, rating: input.rating })
    await this.bookRepository.create(book)

    return book
  }
}