import { ValidationError } from 'yup'
import { EstablishmentRepository } from '@/data/protocolos'
import {
  CreateEstablishment,
  CreateEstablishmentProps,
  establishmentValidationSchema,
} from '@/data/usecases/establishment'
import { makeEstablishmentRepositoryStub } from '@tests/data/mocks/establishment-repository'

type SutTypes = {
  sut: CreateEstablishment
  establishmentRepoStub: EstablishmentRepository
}

const makeSut = (): SutTypes => {
  const establishmentRepoStub = makeEstablishmentRepositoryStub()
  const sut = new CreateEstablishment(establishmentRepoStub)
  return {
    sut,
    establishmentRepoStub,
  }
}

const makeFakeEstablishment = (): CreateEstablishmentProps => ({
  cnpj: '82321089000152',
  name: 'fake_name',
  address: {
    number: 'fake_number',
    neighborhood: 'fake_neighborhood',
    city: 'fake_city',
    state: 'fake_state',
    street: 'fake_street',
  },
})

describe('CreateEstablishment', () => {
  test('deve chamar o validator com os valores corretos', async () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(establishmentValidationSchema, 'validate')
    const props = makeFakeEstablishment()
    await sut.handle(props)
    expect(validateSpy).toHaveBeenCalledWith(props)
  })

  test('deve retornar um erro se o nome não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeEstablishment(),
        name: '',
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Nome é obrigatório')
    }
  })

  test('deve retornar um erro se o CNPJ não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeEstablishment(),
        cnpj: '',
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('CNPJ é obrigatório')
    }
  })

  test('deve retornar um erro se o número do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          number: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Número do endereço é obrigatório')
    }
  })

  test('deve retornar um erro se o cidade do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          city: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Cidade do endereço é obrigatória')
    }
  })

  test('deve retornar um erro se o bairro do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          neighborhood: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Bairro do endereço é obrigatório')
    }
  })

  test('deve retornar um erro se o estado do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          state: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Estado do endereço é obrigatório')
    }
  })

  test('deve retornar um erro se o rua do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          street: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Rua do endereço é obrigatória')
    }
  })

  test('deve retornar um erro se o CNPJ for inválido', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle({
        ...makeFakeEstablishment(),
        cnpj: '432242',
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('CNPJ inválido')
    }
  })

  test('deve chamar o repositório com os valores corretos', async () => {
    const { sut, establishmentRepoStub } = makeSut()
    const createSpy = jest.spyOn(establishmentRepoStub, 'create')
    const body = makeFakeEstablishment()
    await sut.handle(body)
    expect(createSpy).toHaveBeenCalledWith(body)
  })
})
