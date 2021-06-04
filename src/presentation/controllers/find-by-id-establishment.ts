import { ValidationError } from 'yup'
import { Request, Response } from 'express'

import { EstablishmentRepository } from '@/data/protocolos'
import { FindByIdEstablishment } from '@/data/usecases/establishment'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'
import {
  badRequest,
  serverError,
  notFound,
  ok,
} from '@/presentation/helpers/http-helpers'

export class FindByIdEstablishmentController implements Controller {
  private readonly findByIdEstablishment: FindByIdEstablishment

  private readonly establishmentRepo: EstablishmentRepository

  constructor(
    findByIdEstablishment: FindByIdEstablishment,
    establishmentRepo: EstablishmentRepository
  ) {
    this.findByIdEstablishment = findByIdEstablishment
    this.establishmentRepo = establishmentRepo
  }

  async handle(req: Request, res: Response<HttpResponse>) {
    try {
      const establishmentId = Number.parseInt(req.params.id, 10)
      const hasEstablishment = await this.establishmentRepo.findById(
        establishmentId
      )

      if (!hasEstablishment) {
        return res.status(404).json(notFound('Estabelecimento não encontrado'))
      }

      const establishment = await this.findByIdEstablishment.handle(
        establishmentId
      )
      return res.json(ok(establishment))
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(badRequest(error))
      }
      return res.status(500).json(serverError(error))
    }
  }
}
