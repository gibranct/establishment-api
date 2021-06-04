import { Establishment } from '@/domain/entities'
import { CreateEstablishmentProps } from '@/data/usecases/establishment'

export interface EstablishmentRepository {
  create(data: CreateEstablishmentProps): Promise<Establishment>

  update(id: number, data: CreateEstablishmentProps): Promise<void>
}
