import { ValidationError } from 'yup'
import { Request, Response } from 'express'

import { FindAllEstablishment } from '@/data/usecases/establishment'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'
import {
  badRequest,
  serverError,
  ok,
} from '@/presentation/helpers/http-helpers'

export class FindAllEstablishmentController implements Controller {
  private readonly findAllEstablishment: FindAllEstablishment

  constructor(findAllEstablishment: FindAllEstablishment) {
    this.findAllEstablishment = findAllEstablishment
  }

  async handle(req: Request, res: Response<HttpResponse>) {
    try {
      const { offset, limit } = req.headers
      const location =
        req.query.location === undefined ? '' : String(req.query.location)
      const [total, establishments] = await this.findAllEstablishment.handle({
        offset,
        limit,
        query: location,
      })
      return res.json(ok(establishments, undefined, total))
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(badRequest(error))
      }
      return res.status(500).json(serverError(error))
    }
  }
}
