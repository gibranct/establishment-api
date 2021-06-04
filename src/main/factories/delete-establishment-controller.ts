import { DeleteEstablishmentController } from '@/presentation/controllers/delete-establishment'
import { PostgresEstablishmentRepository } from '@/infra/db/postgres-establishment-repository'
import { DeleteEstablishment } from '@/data/usecases/establishment'
import { Controller } from '@/presentation/protocols/controller'

export const makeDeleteEstablishmentController = (): Controller => {
  const establishmentRepo = new PostgresEstablishmentRepository()
  const createEstablishment = new DeleteEstablishment(establishmentRepo)
  return new DeleteEstablishmentController(
    createEstablishment,
    establishmentRepo
  )
}
