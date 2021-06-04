import { Router, Response } from 'express'

import { makeCreateEstablishmentController } from '@/main/factories'

const router = Router()

router.get('/health', (_, res: Response) => res.json('ok'))

router.post('/establishments', (req, res) =>
  makeCreateEstablishmentController().handle(req, res)
)

export default router
