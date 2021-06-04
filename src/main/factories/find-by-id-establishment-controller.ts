import { FindByIdEstablishmentController } from '@/presentation/controllers/find-by-id-establishment'
import { PostgresEstablishmentRepository } from '@/infra/db/postgres-establishment-repository'
import { FindByIdEstablishment } from '@/data/usecases/establishment'
import { Controller } from '@/presentation/protocols/controller'

export const makeFindByIdEstablishmentController = (): Controller => {
  const establishmentRepo = new PostgresEstablishmentRepository()
  const findByIdEstablishment = new FindByIdEstablishment(establishmentRepo)
  return new FindByIdEstablishmentController(
    findByIdEstablishment,
    establishmentRepo
  )
}
