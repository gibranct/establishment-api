import bcrypt from 'bcrypt'

import { HashComparer } from '@/data/protocolos'

export class BcryptHashComparer implements HashComparer {
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest)
  }
}
