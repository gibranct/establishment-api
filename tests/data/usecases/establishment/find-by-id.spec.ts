import { EstablishmentRepository } from '@/data/protocolos'
import { FindByIdEstablishment } from '@/data/usecases/establishment'
import { makeEstablishmentRepositoryStub } from '@tests/data/mocks/establishment-repository'

type SutTypes = {
  sut: FindByIdEstablishment
  establishmentRepoStub: EstablishmentRepository
}

const makeSut = (): SutTypes => {
  const establishmentRepoStub = makeEstablishmentRepositoryStub()
  const sut = new FindByIdEstablishment(establishmentRepoStub)
  return {
    sut,
    establishmentRepoStub,
  }
}

const FAKE_ID = 1

describe('FindByIdEstablishment', () => {
  test('deve chamar o repositório com os valores corretos', async () => {
    const { sut, establishmentRepoStub } = makeSut()
    const findBySpy = jest.spyOn(establishmentRepoStub, 'findById')
    const response = await sut.handle(FAKE_ID)
    expect(response).toBeTruthy()
    expect(findBySpy).toHaveBeenCalledWith(FAKE_ID)
  })
})
