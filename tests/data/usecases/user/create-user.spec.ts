import { ValidationError } from 'yup'
import { UserRepository, Encrypter } from '@/data/protocolos'
import {
  CreateUser,
  CreateUserProps,
  userValidationSchema,
} from '@/data/usecases/user'
import { makeUserRepository } from '@tests/data/mocks/user-repository'
import { makeEncrypter } from '@tests/data/mocks/encrypter'

type SutTypes = {
  sut: CreateUser
  encrypterStub: Encrypter
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepository()
  const encrypterStub = makeEncrypter()
  const sut = new CreateUser(encrypterStub, userRepositoryStub)
  return {
    sut,
    userRepositoryStub,
    encrypterStub,
  }
}

const makeFakeUserModel = (): CreateUserProps => ({
  email: 'fake_email',
  name: 'fake_name',
  password: 'fake_password',
})

describe('CreateUser', () => {
  test('deve chamar Encrypter com a senha correta', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const userModel = makeFakeUserModel()
    await sut.handle(userModel)
    expect(encryptSpy).toHaveBeenCalledWith(userModel.password!)
  })

  test('deve chamar o repositório com os valores corretos', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(userRepositoryStub, 'create')
    const body = makeFakeUserModel()
    await sut.handle(body)
    expect(createSpy).toHaveBeenCalledWith({
      ...body,
      password: 'hashed_password',
    })
  })

  test('deve chamar o validator com os valores corretos', async () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(userValidationSchema, 'validate')
    const props = makeFakeUserModel()
    await sut.handle(props)
    expect(validateSpy).toHaveBeenCalledWith(props)
  })

  test('deve retornar um erro se o nome não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeUserModel(),
        name: undefined,
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Nome é obrigatório')
    }
  })

  test('deve retornar um erro se o email não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeUserModel(),
        email: undefined,
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Email é obrigatório')
    }
  })

  test('deve retornar um erro se o password não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeUserModel(),
        password: undefined,
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Senha é obrigatória')
    }
  })
})
