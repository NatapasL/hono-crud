import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import { Genre } from "../../../../domain/books/entities/genre";
import { BookRepository } from "../../../../domain/books/repositories/book.repository";
import { Book } from "../../../../domain/books/entities/book";

export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(book: Book): Promise<Book> {
    await this.prisma.books.create({
      data: {
        id: book.id.toString(),
        name: book.name,
        genres: book.genres,
        rating: book.rating
      }
    })

    return book
  }

  async findAll(): Promise<Book[]> {
    const books = await  this.prisma.books.findMany()

    return books.map<Book>((book) => new Book({
      ...book,
      id: new ObjectId(book.id),
      genres: book.genres as Genre[]
    }))
  }

  async update(book: Book): Promise<Book>{
    await this.prisma.books.update({
      where: { id: book.id.toString() },
      data: {
        name: book.name,
        genres: book.genres,
        rating: book.rating
      }
    })

    return book
  }

  async findById(id: ObjectId): Promise<Book> {
    const book = await this.prisma.books.findFirstOrThrow({ where: { id: id.toString() }})

    return new Book({ ...book, id: new ObjectId(book.id), genres: book.genres as Genre[] })
  }

  async delete(id: ObjectId): Promise<void> {
    await this.prisma.books.delete({ where: { id: id.toString() } })
  }
}