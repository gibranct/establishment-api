import { Request, NextFunction, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'

import jwtConfig from '@/config/jwt'
import { unauthorized, serverError } from '@/presentation/helpers/http-helpers'

export class AuthMiddleware {
  private tokenIsValid = (token: string): Promise<boolean> => {
    return new Promise((resolve) => {
      jsonwebtoken.verify(token, jwtConfig.secret, (err) => {
        if (err) {
          return resolve(false)
        }
        return resolve(true)
      })
    })
  }

  async handle(request: Request, res: Response, next: NextFunction) {
    try {
      const [, accessToken] = (request.headers?.authorization || '')?.split(' ')
      const isValid = await this.tokenIsValid(accessToken)
      if (isValid) {
        return next()
      }
      return res.status(401).json(unauthorized())
    } catch (error) {
      return res.status(500).json(serverError(error))
    }
  }
}
