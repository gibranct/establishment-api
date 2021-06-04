import { ValidationError } from 'yup'
import { Request, Response } from 'express'

import { EstablishmentRepository } from '@/data/protocolos'
import { DeleteEstablishment } from '@/data/usecases/establishment'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'
import {
  badRequest,
  serverError,
  notFound,
} from '@/presentation/helpers/http-helpers'

export class DeleteEstablishmentController implements Controller {
  private readonly deleteEstablishment: DeleteEstablishment

  private readonly establishmentRepo: EstablishmentRepository

  constructor(
    deleteEstablishment: DeleteEstablishment,
    establishmentRepo: EstablishmentRepository
  ) {
    this.deleteEstablishment = deleteEstablishment
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

      await this.deleteEstablishment.handle(establishmentId)
      return res.status(204).json()
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(badRequest(error))
      }
      return res.status(500).json(serverError(error))
    }
  }
}
