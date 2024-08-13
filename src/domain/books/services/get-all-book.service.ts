import { Book } from "../entities/book";
import { BookRepository } from "../repositories/book.repository";

export class GetAllBookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAllBook(): Promise<Book[]> {
    return await this.bookRepository.findAll()
  }
}