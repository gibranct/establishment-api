import { Router, Response } from 'express'

import {
  makeCreateEstablishmentController,
  makeUpdateEstablishmentController,
  makeDeleteEstablishmentController,
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

export default router
