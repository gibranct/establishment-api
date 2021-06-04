import { Establishment } from '@/domain/entities'
import { CreateEstablishmentProps } from '@/data/usecases'

export interface EstablishmentRepository {
  create(data: CreateEstablishmentProps): Promise<Establishment>
}
