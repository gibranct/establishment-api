import { EstablishmentRepository } from '@/data/protocolos'

export class FindByIdEstablishment {
  private readonly establishmentRepo: EstablishmentRepository

  constructor(establishmentRepo: EstablishmentRepository) {
    this.establishmentRepo = establishmentRepo
  }

  async handle(id: number) {
    return this.establishmentRepo.findById(id)
  }
}
