import { ValidationError } from 'yup'
import { EstablishmentRepository } from '@/data/protocolos'
import {
  UpdateEstablishment,
  UpdateEstablishmentProps,
  establishmentValidationSchema,
} from '@/data/usecases/establishment'
import { makeEstablishmentRepositoryStub } from '@tests/data/mocks/establishment-repository'

type SutTypes = {
  sut: UpdateEstablishment
  establishmentRepoStub: EstablishmentRepository
}

const makeSut = (): SutTypes => {
  const establishmentRepoStub = makeEstablishmentRepositoryStub()
  const sut = new UpdateEstablishment(establishmentRepoStub)
  return {
    sut,
    establishmentRepoStub,
  }
}

const makeFakeEstablishment = (): UpdateEstablishmentProps => ({
  cnpj: '82321089000152',
  name: 'fake_name',
  address: {
    zipCode: 'fake_zip_code',
    neighborhood: 'fake_neighborhood',
    city: 'fake_city',
    state: 'fake_state',
    street: 'fake_street',
  },
})

const FAKE_ID = 1

describe('CreatePauseSchedule', () => {
  test('deve chamar o validator com os valores corretos', async () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(establishmentValidationSchema, 'validate')
    const props = makeFakeEstablishment()
    await sut.handle(FAKE_ID, props)
    expect(validateSpy).toHaveBeenCalledWith(props)
  })

  test('deve retornar um erro se o nome não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle(FAKE_ID, {
        ...makeFakeEstablishment(),
        name: undefined,
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Nome é obrigatório')
    }
  })

  test('deve retornar um erro se o CNPJ não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle(FAKE_ID, {
        ...makeFakeEstablishment(),
        cnpj: undefined,
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('CNPJ é obrigatório')
    }
  })

  test('deve retornar um erro se o cep do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle(FAKE_ID, {
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          zipCode: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('CEP é obrigatório')
    }
  })

  test('deve retornar um erro se o cidade do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle(FAKE_ID, {
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          city: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Cidade é obrigatória')
    }
  })

  test('deve retornar um erro se o bairro do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle(FAKE_ID, {
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          neighborhood: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Bairro é obrigatório')
    }
  })

  test('deve retornar um erro se o estado do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle(FAKE_ID, {
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          state: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Estado é obrigatório')
    }
  })

  test('deve retornar um erro se o rua do endereço não for passado', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle(FAKE_ID, {
        ...makeFakeEstablishment(),
        address: {
          ...makeFakeEstablishment().address,
          street: '',
        },
      })
      expect(response).toBeInstanceOf(ValidationError)
    } catch (error) {
      expect(error.message).toEqual('Rua é obrigatória')
    }
  })

  test('deve retornar um erro se o CNPJ for inválido', async () => {
    try {
      const { sut } = makeSut()
      const response = await sut.handle(FAKE_ID, {
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
    const createSpy = jest.spyOn(establishmentRepoStub, 'update')
    const body = makeFakeEstablishment()
    await sut.handle(FAKE_ID, body)
    expect(createSpy).toHaveBeenCalledWith(FAKE_ID, body)
  })
})
