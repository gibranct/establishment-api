import { ValidationError } from 'yup'
import { Request, Response } from 'express'

import { CreateEstablishment } from '@/data/usecases/establishment/create'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'
import {
  created,
  badRequest,
  serverError,
} from '@/presentation/helpers/http-helpers'
import { EstablishmentRepository } from '@/data/protocolos'

export class CreateEstablishmentController implements Controller {
  private readonly createEstablishment: CreateEstablishment

  private readonly establishmentRepo: EstablishmentRepository

  constructor(
    createEstablishment: CreateEstablishment,
    establishmentRepo: EstablishmentRepository
  ) {
    this.createEstablishment = createEstablishment
    this.establishmentRepo = establishmentRepo
  }

  async handle(req: Request, res: Response<HttpResponse>) {
    try {
      const hasEstablishment = await this.establishmentRepo.findByCnpj(
        req.body.cnpj
      )

      if (hasEstablishment) {
        return res
          .status(400)
          .json(badRequest(new Error('Não pode haver CNPJ duplicado')))
      }

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
