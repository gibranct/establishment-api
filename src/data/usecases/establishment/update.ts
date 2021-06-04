import { EstablishmentRepository } from '@/data/protocolos'
import { establishmentValidationSchema } from '@/data/usecases/establishment'

export type UpdateEstablishmentProps = {
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

export class UpdateEstablishment {
  private readonly establishmentRepo: EstablishmentRepository

  constructor(establishmentRepo: EstablishmentRepository) {
    this.establishmentRepo = establishmentRepo
  }

  async handle(id: number, props: UpdateEstablishmentProps) {
    await establishmentValidationSchema.validate(props)

    return this.establishmentRepo.update(id, props)
  }
}
