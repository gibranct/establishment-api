import { Request, Response } from 'express'

import { Login } from '@/data/usecases/authentication'
import { Controller, HttpResponse } from '@/presentation/protocols/controller'
import { serverError, badRequest } from '@/presentation/helpers/http-helpers'

export class LoginController implements Controller {
  private readonly login: Login

  constructor(login: Login) {
    this.login = login
  }

  async handle(req: Request, res: Response<HttpResponse>) {
    try {
      const accessToken = await this.login.handle(req.body)
      if (accessToken) {
        return res.json({
          status: 200,
          jwtToken: accessToken,
        })
      }
      return res
        .status(400)
        .json(badRequest(new Error('Email/senha inválidos')))
    } catch (error) {
      return res.status(500).json(serverError(error))
    }
  }
}
