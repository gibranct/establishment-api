import { EstablishmentRepository } from '@/data/protocolos'
import { DeleteEstablishment } from '@/data/usecases/establishment'
import { makeEstablishmentRepositoryStub } from '@tests/data/mocks/establishment-repository'

type SutTypes = {
  sut: DeleteEstablishment
  establishmentRepoStub: EstablishmentRepository
}

const makeSut = (): SutTypes => {
  const establishmentRepoStub = makeEstablishmentRepositoryStub()
  const sut = new DeleteEstablishment(establishmentRepoStub)
  return {
    sut,
    establishmentRepoStub,
  }
}

const FAKE_ID = 1

describe('DeleteEstablishment', () => {
  test('deve chamar o repositório com os valores corretos', async () => {
    const { sut, establishmentRepoStub } = makeSut()
    const deleteSpy = jest.spyOn(establishmentRepoStub, 'remove')
    await sut.handle(FAKE_ID)
    expect(deleteSpy).toHaveBeenCalledWith(FAKE_ID)
  })
})
