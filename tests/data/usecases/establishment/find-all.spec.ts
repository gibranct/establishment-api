import { EstablishmentRepository } from '@/data/protocolos'
import { FindAllEstablishment } from '@/data/usecases/establishment'
import { makeEstablishmentRepositoryStub } from '@tests/data/mocks/establishment-repository'

type SutTypes = {
  sut: FindAllEstablishment
  establishmentRepoStub: EstablishmentRepository
}

const makeSut = (): SutTypes => {
  const establishmentRepoStub = makeEstablishmentRepositoryStub()
  const sut = new FindAllEstablishment(establishmentRepoStub)
  return {
    sut,
    establishmentRepoStub,
  }
}

describe('FindAllEstablishment', () => {
  test('deve chamar o repositório com os valores corretos', async () => {
    const { sut, establishmentRepoStub } = makeSut()
    const findAllSpy = jest.spyOn(establishmentRepoStub, 'findAll')
    const params = {
      offset: 0,
      limit: 0,
      query: 'fake_query',
    }
    const response = await sut.handle(params)
    expect(response).toEqual([0, []])
    expect(findAllSpy).toHaveBeenCalledWith(params)
  })
})
