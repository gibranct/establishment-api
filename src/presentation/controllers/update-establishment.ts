import { EstablishmentRepository } from '@/data/protocolos'
import { ValidationError } from 'yup'
import { Request, Response } from 'express'

import { UpdateEstablishment } from '@/data/usecases/establishment'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'

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
        return res.status(404).json({
          status: 404,
          message: 'Estabelecimento não encontrado',
        })
      }

      await this.updateEstablishment.handle(establishmentId, req.body)
      return res.json({
        status: 200,
        message: 'Estabelecimento atualizado',
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          status: 400,
          title: 'Campos Inválidos',
          message: error.message,
        })
      }
      return res.status(500).json({
        status: 500,
        title: 'Erro Interno no servidor',
        message: error.message,
      })
    }
  }
}
