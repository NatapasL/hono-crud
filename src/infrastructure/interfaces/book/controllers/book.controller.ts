import { Context } from "hono";
import { plainToInstance } from "class-transformer";
import { CreateBookValidator } from "../validators/create-book.validator";
import { validate } from "class-validator";
import { HTTPException } from 'hono/http-exception'
import { CreateBookService } from "../../../../domain/books/services/create-book.service";
import { GetAllBookService } from "../../../../domain/books/services/get-all-book.service";
import { HttpStatus } from "../../http/http-status.enum";
import { UpdateBookValidator } from "../validators/update-book.validator";
import { UpdateBookService } from "../../../../domain/books/services/update-book.service";
import { ObjectId } from "bson";
import { DeleteBookService } from "../../../../domain/books/services/delete-book.service";

export interface BookControllerDependencies {
  createBookService: CreateBookService
  getAllBookService: GetAllBookService
  updateBookService: UpdateBookService
  deleteBookService: DeleteBookService
}

export class BookController {
  constructor(private readonly dependencies: BookControllerDependencies) {}

  index = async (ctx: Context) => {
    const books = await this.dependencies.getAllBookService.getAllBook()

    return ctx.json(books, HttpStatus.OK)
  }

  create = async (ctx: Context) => {
    const body = plainToInstance(
      CreateBookValidator,
      await ctx.req.json(),
    )

    const errors = await validate(body, { whitelist: true, forbidNonWhitelisted: true })
    if (errors.length > 0) {
      throw new HTTPException(HttpStatus.BAD_REQUEST, { message: `Validate error: ${errors.join(`, `)}` })
    }

    const book = await this.dependencies.createBookService.createBook(body)

    return ctx.json(book, HttpStatus.OK)
  }

  update = async (ctx: Context) => {
    const id = new ObjectId(ctx.req.param(`id`))
    const body = plainToInstance(
      UpdateBookValidator,
      await ctx.req.json(),
    )

    const errors = await validate(body, { whitelist: true, forbidNonWhitelisted: true })
    if (errors.length > 0) {
      throw new HTTPException(HttpStatus.BAD_REQUEST, { message: `Validate error: ${errors.join(`, `)}` })
    }

    const book = await this.dependencies.updateBookService.updateBook({ id, ...body })

    return ctx.json(book, HttpStatus.OK)
  }

  delete = async (ctx: Context) => {
    const id = new ObjectId(ctx.req.param(`id`))
    const book = await this.dependencies.deleteBookService.deleteBook(id)

    return ctx.json(book, HttpStatus.OK)
  }
}