import { Hono } from 'hono'
import { MainRouter } from './main.router'
import { PrismaBookRepository } from './infrastructure/database/prisma/repositories'
import { PrismaClient } from '@prisma/client';
import { CreateBookService } from './domain/books/services/create-book.service';
import { GetAllBookService } from './domain/books/services/get-all-book.service';
import { BookController } from './infrastructure/interfaces/book/controllers/book.controller';
import { BookRouter } from './infrastructure/interfaces/book/book.router';
import { UpdateBookService } from './domain/books/services/update-book.service';
import { DeleteBookService } from './domain/books/services/delete-book.service';

const app = new Hono()

// database
const prisma = new PrismaClient();
const bookRepository = new PrismaBookRepository(prisma)

// domain
const createBookService = new CreateBookService(bookRepository)
const getAllBookService = new GetAllBookService(bookRepository)
const updateBookService = new UpdateBookService(bookRepository)
const deleteBookService = new DeleteBookService(bookRepository)

// controller
const bookController = new BookController({
  createBookService,
  getAllBookService,
  updateBookService,
  deleteBookService
})

// routers
const bookRouter = new BookRouter(new Hono(), bookController)

const router = new  MainRouter({app, bookRouter})
router.route()

export default app
