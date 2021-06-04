import { CreateEstablishmentController } from '@/presentation/controllers/create-establishment'
import { PostgresEstablishmentRepository } from '@/infra/db/postgres-establishment-repository'
import { CreateEstablishment } from '@/data/usecases/establishment'
import { Controller } from '@/presentation/protocols/controller'

export const makeCreateEstablishmentController = (): Controller => {
  const establishmenRepo = new PostgresEstablishmentRepository()
  const createEstablishment = new CreateEstablishment(establishmenRepo)
  return new CreateEstablishmentController(createEstablishment)
}
