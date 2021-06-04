import { Establishment } from '@/domain/entities'
import { EstablishmentRepository, PaginationParams } from '@/data/protocolos'
import {
  UpdateEstablishmentProps,
  CreateEstablishmentProps,
} from '@/data/usecases/establishment'

export const makeEstablishmentRepositoryStub = (): EstablishmentRepository => {
  class EstablishmentRepositoryStub implements EstablishmentRepository {
    // eslint-disable-next-line no-unused-vars
    findAll(params: PaginationParams): Promise<[number, Establishment[]]> {
      return Promise.resolve([0, []])
    }

    // eslint-disable-next-line no-unused-vars
    findById(id: number): Promise<Establishment | null> {
      return Promise.resolve(new Establishment())
    }

    // eslint-disable-next-line no-unused-vars
    remove(id: number): Promise<void> {
      return Promise.resolve()
    }

    // eslint-disable-next-line no-unused-vars
    async update(id: number, data: UpdateEstablishmentProps): Promise<void> {
      return Promise.resolve()
    }

    // eslint-disable-next-line no-unused-vars
    async create(data: CreateEstablishmentProps): Promise<Establishment> {
      return Promise.resolve(new Establishment())
    }
  }

  return new EstablishmentRepositoryStub()
}
