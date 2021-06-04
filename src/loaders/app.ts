import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'

import routes from '../routes'

const app = express()

app.use(express.json({ limit: '50mb' }))

app.use(express.urlencoded({ extended: true }))

morgan.token('body', (req: express.Request) => {
  const isTheContentJson = req.headers['content-type']?.includes(
    'application/json'
  )
  if (isTheContentJson) {
    return JSON.stringify(req.body)
  }
  return 'body-empty'
})

app.use((req: Request, res: Response, next: NextFunction) => {
  const { offset, limit } = req.headers

  req.headers.offset = Number.isNaN(Number(offset)) ? 0 : offset
  req.headers.limit = Number.isNaN(Number(limit)) ? 100 : limit

  return next()
})

app.use(morgan(':date[iso] :method :url :status :body - :total-time ms'))

app.use('/api', routes)

export default app
