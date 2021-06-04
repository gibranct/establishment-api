import { ValidationError } from 'yup'
import { Request, Response } from 'express'

import { CreateEstablishment } from '@/data/usecases/establishment/create'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'
import {
  created,
  badRequest,
  serverError,
} from '@/presentation/helpers/http-helpers'

export class CreateEstablishmentController implements Controller {
  private readonly createEstablishment: CreateEstablishment

  constructor(createEstablishment: CreateEstablishment) {
    this.createEstablishment = createEstablishment
  }

  async handle(req: Request, res: Response<HttpResponse>) {
    try {
      const establishment = await this.createEstablishment.handle(req.body)
      return res.status(201).json(created(establishment))
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(badRequest(error))
      }
      return res.status(500).json(serverError(error))
    }
  }
}
