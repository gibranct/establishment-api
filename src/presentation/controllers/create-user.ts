import { ValidationError } from 'yup'
import { Request, Response } from 'express'

import { CreateUser } from '@/data/usecases/user'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'
import {
  created,
  badRequest,
  serverError,
} from '@/presentation/helpers/http-helpers'

export class CreateUserController implements Controller {
  private readonly createUser: CreateUser

  constructor(createUser: CreateUser) {
    this.createUser = createUser
  }

  async handle(req: Request, res: Response<HttpResponse>) {
    try {
      const newUser = await this.createUser.handle(req.body)
      return res.status(201).json(created(newUser))
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(badRequest(error))
      }
      return res.status(500).json(serverError(error))
    }
  }
}
