import { BcryptEncrypter } from '@/infra/cryptography/bcrypt-encrypter'
import { CreateUserController } from '@/presentation/controllers/create-user'
import { PostgresUserRepository } from '@/infra/db/postgres-user-repository'
import { CreateUser } from '@/data/usecases/user'
import { Controller } from '@/presentation/protocols/controller'

export const makeCreateUserController = (): Controller => {
  const userRepo = new PostgresUserRepository()
  const salt = 12
  const bcryptEncrypter = new BcryptEncrypter(salt)
  const createEstablishment = new CreateUser(bcryptEncrypter, userRepo)
  return new CreateUserController(createEstablishment)
}
