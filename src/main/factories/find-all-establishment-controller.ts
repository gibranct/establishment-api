import { FindAllEstablishmentController } from '@/presentation/controllers/find-all-establishments'
import { PostgresEstablishmentRepository } from '@/infra/db/postgres-establishment-repository'
import { FindAllEstablishment } from '@/data/usecases/establishment'
import { Controller } from '@/presentation/protocols/controller'

export const makeFindAllEstablishmentController = (): Controller => {
  const establishmentRepo = new PostgresEstablishmentRepository()
  const findAllEstablishment = new FindAllEstablishment(establishmentRepo)
  return new FindAllEstablishmentController(findAllEstablishment)
}
