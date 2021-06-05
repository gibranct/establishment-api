import { Encrypter, UserRepository } from '@/data/protocolos'
import { userValidationSchema } from './validation-schema'

export type CreateUserProps = {
  name?: string
  email?: string
  password?: string
}

export class CreateUser {
  private readonly encrypter: Encrypter

  private readonly userRepository: UserRepository

  constructor(encrypter: Encrypter, userRepository: UserRepository) {
    this.encrypter = encrypter
    this.userRepository = userRepository
  }

  async handle(props: CreateUserProps) {
    await userValidationSchema.validate(props)
    const hashedPassword = await this.encrypter.encrypt(props.password!)
    const newAccount = await this.userRepository.create({
      ...props,
      password: hashedPassword,
    })
    return newAccount
  }
}
