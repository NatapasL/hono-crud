import { Hono } from "hono";
import { BlankEnv, BlankSchema } from "hono/types";
import { BookController } from "./infrastructure/interfaces/book/controllers/book.controller";
import { BookRouter } from "./infrastructure/interfaces/book/book.router";

export interface MainRouterDependencies {
  app: Hono
  bookRouter: BookRouter
}

export class MainRouter {
  constructor(private readonly dependencies: MainRouterDependencies) {}

  route() {
    this.dependencies.app.get('/', (c) => {
      return c.text('Hello Hono!')
    })

    this.dependencies.app.route(`/book`, this.dependencies.bookRouter.routes())
  }

}