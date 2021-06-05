import { getRepository } from 'typeorm'

import { UserRepository } from '@/data/protocolos'
import { CreateUserProps } from '@/data/usecases/user'
import { User } from '@/domain/entities'

export class PostgresUserRepository implements UserRepository {
  async create(data: CreateUserProps): Promise<User> {
    const newUser = await getRepository(User).save({
      email: data.email,
      name: data.name,
      password: data.password,
    })

    return newUser
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await getRepository(User).findOne({
      email,
    })

    return user ?? null
  }
}
