import { UpdateEstablishmentController } from '@/presentation/controllers/update-establishment'
import { PostgresEstablishmentRepository } from '@/infra/db/postgres-establishment-repository'
import { UpdateEstablishment } from '@/data/usecases/establishment'
import { Controller } from '@/presentation/protocols/controller'

export const makeUpdateEstablishmentController = (): Controller => {
  const establishmentRepo = new PostgresEstablishmentRepository()
  const createEstablishment = new UpdateEstablishment(establishmentRepo)
  return new UpdateEstablishmentController(
    createEstablishment,
    establishmentRepo
  )
}
