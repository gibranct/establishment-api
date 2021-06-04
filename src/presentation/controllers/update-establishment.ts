import { ValidationError } from 'yup'
import { Request, Response } from 'express'

import { EstablishmentRepository } from '@/data/protocolos'
import { UpdateEstablishment } from '@/data/usecases/establishment'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'
import {
  badRequest,
  serverError,
  notFound,
  ok,
} from '@/presentation/helpers/http-helpers'

export class UpdateEstablishmentController implements Controller {
  private readonly updateEstablishment: UpdateEstablishment

  private readonly establishmentRepo: EstablishmentRepository

  constructor(
    updateEstablishment: UpdateEstablishment,
    establishmentRepo: EstablishmentRepository
  ) {
    this.updateEstablishment = updateEstablishment
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

      await this.updateEstablishment.handle(establishmentId, req.body)
      return res.json(ok(null, 'Estabelecimento atualizado'))
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(badRequest(error))
      }
      return res.status(500).json(serverError(error))
    }
  }
}
