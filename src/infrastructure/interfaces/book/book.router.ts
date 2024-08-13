import { Hono } from "hono";
import { BookController } from "./controllers/book.controller";

export class BookRouter {
  constructor(
    private readonly app: Hono,
    private readonly bookController: BookController
  ) {
    this.app.get(`/`, this.bookController.index)
    this.app.post(`/`, this.bookController.create)
    this.app.put(`/:id`, this.bookController.update)
    this.app.delete(`/:id`, this.bookController.delete)
  }

  routes(): Hono {
    return this.app
  }
}