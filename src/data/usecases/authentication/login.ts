import { HashComparer, TokenGenerator, UserRepository } from '@/data/protocolos'

export type LoginProps = {
  email: string
  password: string
}

export class Login {
  private readonly userRepository: UserRepository

  private readonly hashComparer: HashComparer

  private readonly tokenGenerator: TokenGenerator

  constructor(
    userRepository: UserRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.userRepository = userRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async handle(authenticationParams: LoginProps) {
    const user = await this.userRepository.findByEmail(
      authenticationParams.email
    )
    if (user) {
      const isValid = await this.hashComparer.compare(
        authenticationParams.password,
        user.password
      )
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(String(user.id))
        return accessToken
      }
    }
    return null
  }
}
