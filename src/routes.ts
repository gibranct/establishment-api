import { Router, Response } from 'express'

import {
  makeCreateEstablishmentController,
  makeUpdateEstablishmentController,
  makeDeleteEstablishmentController,
  makeFindByIdEstablishmentController,
  makeFindAllEstablishmentController,
  makeCreateUserController,
  makeLoginController,
  makeAuthMiddleware,
} from '@/main/factories'

const router = Router()

router.post('/users', (req, res) => makeCreateUserController().handle(req, res))

router.post('/login', (req, res) => makeLoginController().handle(req, res))

router.get('/health', (_, res: Response) => res.json('ok'))

router.use((req, res, next) => makeAuthMiddleware().handle(req, res, next))

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
