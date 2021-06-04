import { Request, Response } from 'express'

export type HttpResponse = {
  status: number
  title?: string
  message?: string
  data?: any
}

export interface Controller {
  handle(req: Request, res: Response<HttpResponse>): Promise<any>
}
