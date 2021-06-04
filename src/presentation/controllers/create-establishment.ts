import { ValidationError } from 'yup'
import { Request, Response } from 'express'

import { CreateEstablishment } from '@/data/usecases/establishment/create'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'

export class CreateEstablishmentController implements Controller {
  private readonly createEstablishment: CreateEstablishment

  constructor(createEstablishment: CreateEstablishment) {
    this.createEstablishment = createEstablishment
  }

  async handle(req: Request, res: Response<HttpResponse>) {
    try {
      const establishmen = await this.createEstablishment.handle(req.body)
      return res.status(201).json({
        status: 201,
        data: establishmen,
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
