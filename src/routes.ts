import { Router, Response } from 'express'

import {
  makeCreateEstablishmentController,
  makeUpdateEstablishmentController,
  makeDeleteEstablishmentController,
  makeFindByIdEstablishmentController,
  makeFindAllEstablishmentController,
} from '@/main/factories'

const router = Router()

router.get('/health', (_, res: Response) => res.json('ok'))

router.post('/establishments', (req, res) =>
  makeCreateEstablishmentController().handle(req, res)
)

router.put('/establishments/:id', (req, res) =>
  makeUpdateEstablishmentController().handle(req, res)
)

router.delete('/establishments/:id', (req, res) =>
  makeDeleteEstablishmentController().handle(req, res)
)

router.get('/establishments/:id', (req, res) =>
  makeFindByIdEstablishmentController().handle(req, res)
)

router.get('/establishments', (req, res) =>
  makeFindAllEstablishmentController().handle(req, res)
)

export default router
