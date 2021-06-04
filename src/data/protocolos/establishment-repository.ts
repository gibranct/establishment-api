import { Establishment } from '@/domain/entities'
import { CreateEstablishmentProps } from '@/data/usecases/establishment'

export type PaginationParams = {
  offset?: number | string
  limit?: number | string
  query?: string
}
export interface EstablishmentRepository {
  create(data: CreateEstablishmentProps): Promise<Establishment>

  update(id: number, data: CreateEstablishmentProps): Promise<void>

  remove(id: number): Promise<void>

  findById(id: number): Promise<Establishment | null>

  findAll(params: PaginationParams): Promise<Array<Establishment>>
}
