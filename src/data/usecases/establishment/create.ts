import { EstablishmentRepository } from '@/data/protocolos'
import { establishmentValidationSchema } from '@/data/usecases/establishment'

export type CreateEstablishmentProps = {
  cnpj?: string
  name?: string
  address?: {
    zipCode?: string
    neighborhood?: string
    city?: string
    state?: string
    street?: string
  }
}

export class CreateEstablishment {
  private readonly establishmentRepo: EstablishmentRepository

  constructor(establishmentRepo: EstablishmentRepository) {
    this.establishmentRepo = establishmentRepo
  }

  async handle(props: CreateEstablishmentProps) {
    await establishmentValidationSchema.validate(props)

    return this.establishmentRepo.create(props)
  }
}
