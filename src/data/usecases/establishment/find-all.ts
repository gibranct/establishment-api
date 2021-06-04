import { EstablishmentRepository } from '@/data/protocolos'

export type FindAllEstablishmentType = {
  offset?: number | string
  limit?: number | string
  query?: string
}

export class FindAllEstablishment {
  private readonly establishmentRepo: EstablishmentRepository

  constructor(establishmentRepo: EstablishmentRepository) {
    this.establishmentRepo = establishmentRepo
  }

  async handle(params: FindAllEstablishmentType) {
    return this.establishmentRepo.findAll(params)
  }
}
