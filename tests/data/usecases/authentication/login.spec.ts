import { makeUserRepository } from '@tests/data/mocks/user-repository'
import { HashComparer, TokenGenerator, UserRepository } from '@/data/protocolos'
import { LoginProps, Login } from '@/data/usecases/authentication'

const makeFakeLogin = (): LoginProps => ({
  email: 'any_email@mail.com',
  password: 'any_password',
})

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    // eslint-disable-next-line no-unused-vars
    async compare(password: string, hashedPassword: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    // eslint-disable-next-line no-unused-vars
    async generate(id: string): Promise<string> {
      return Promise.resolve('token')
    }
  }

  return new TokenGeneratorStub()
}

type SutTypes = {
  sut: Login
  userRepositoryStub: UserRepository
  hashComparerStub: HashComparer
  tokenGeneratorStub: TokenGenerator
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGeneratorStub = makeTokenGenerator()
  const sut = new Login(
    userRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
  )
  return {
    sut,
    userRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
  }
}

describe('Login', () => {
  test('deve chamar findByEmail com o email correto', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(userRepositoryStub, 'findByEmail')
    await sut.handle(makeFakeLogin())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('deve retornar null se findByEmail retornar null', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findByEmail').mockResolvedValueOnce(null)
    const accessToken = await sut.handle(makeFakeLogin())
    expect(accessToken).toBeNull()
  })

  test('deve chamar HashComparer com os valores corretos', async () => {
    const { sut, hashComparerStub } = makeSut()
    const hashComparerSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.handle(makeFakeLogin())
    expect(hashComparerSpy).toHaveBeenCalledWith(
      'any_password',
      'hashed_password'
    )
  })

  test('deve retornar null se HashComparer retornar false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValue(false)
    const accessToken = await sut.handle(makeFakeLogin())
    expect(accessToken).toBeNull()
  })

  test('deve chamar TokenGenerator com os valores corretos', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const tokenGeneratorSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.handle(makeFakeLogin())
    expect(tokenGeneratorSpy).toHaveBeenCalledWith(
      JSON.stringify({
        userId: 1,
        userName: 'valid_name',
      })
    )
  })

  test('deve retornar o token', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.handle(makeFakeLogin())
    await expect(accessToken).toBe('token')
  })
})
