import { User } from '@/domain/entities'
import { UserRepository } from '@/data/protocolos'
import { CreateUserProps } from '@/data/usecases/user/create'

export const makeFakeUser = (): User => ({
  id: 1,
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password',
})

export const makeUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    // eslint-disable-next-line no-unused-vars
    async findByEmail(email: string): Promise<User | null> {
      return new Promise((resolve) => resolve(makeFakeUser()))
    }

    // eslint-disable-next-line no-unused-vars
    async create(user: CreateUserProps): Promise<User> {
      return new Promise((resolve) => resolve(makeFakeUser()))
    }
  }
  return new UserRepositoryStub()
}
