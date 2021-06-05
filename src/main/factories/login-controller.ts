import jwtConfig from '@/config/jwt'
import { JwtTokenGenerator } from '@/infra/cryptography/jwt-token-generator'
import { LoginController } from '@/presentation/controllers/login'
import { PostgresUserRepository } from '@/infra/db/postgres-user-repository'
import { Login } from '@/data/usecases/authentication'
import { Controller } from '@/presentation/protocols/controller'
import { BcryptHashComparer } from '@/infra/cryptography/bcrypt-hash-comparer'

export const makeLoginController = (): Controller => {
  const userRepo = new PostgresUserRepository()
  const bcryptCashComparer = new BcryptHashComparer()
  const jwtTokenGenerator = new JwtTokenGenerator(jwtConfig.secret)
  const createEstablishment = new Login(
    userRepo,
    bcryptCashComparer,
    jwtTokenGenerator
  )
  return new LoginController(createEstablishment)
}
