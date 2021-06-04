import { getRepository } from 'typeorm'

import { EstablishmentRepository, PaginationParams } from '@/data/protocolos'
import {
  CreateEstablishmentProps,
  UpdateEstablishmentProps,
} from '@/data/usecases/establishment'
import { Establishment } from '@/domain/entities'

export class PostgresEstablishmentRepository
  implements EstablishmentRepository {
  async create(data: CreateEstablishmentProps): Promise<Establishment> {
    const newEstablishment = await getRepository(Establishment).save({
      cnpj: data.cnpj,
      name: data!.name,
      address: {
        zipCode: data.address?.zipCode,
        neighborhood: data.address?.neighborhood,
        city: data.address?.city,
        state: data.address?.state,
        street: data.address?.street,
      },
    })

    return newEstablishment
  }

  async findById(id: number): Promise<Establishment | null> {
    const establishment = await getRepository(Establishment).findOne(id)

    return establishment ?? null
  }

  async remove(id: number): Promise<void> {
    await getRepository(Establishment).delete(id)
  }

  async update(id: number, data: UpdateEstablishmentProps): Promise<void> {
    await getRepository(Establishment).update(id, {
      cnpj: data.cnpj,
      name: data!.name,
      address: {
        zipCode: data.address?.zipCode,
        neighborhood: data.address?.neighborhood,
        city: data.address?.city,
        state: data.address?.state,
        street: data.address?.street,
      },
    })
  }

  // eslint-disable-next-line no-unused-vars
  findAll(params: PaginationParams): Promise<Establishment[]> {
    return Promise.resolve([])
  }
}
