import jwt from 'jsonwebtoken'

import { TokenGenerator } from '@/data/protocolos'

export class JwtTokenGenerator implements TokenGenerator {
  private readonly secret: string

  constructor(secret: string) {
    this.secret = secret
  }

  async generate(plaintext: string): Promise<string> {
    return jwt.sign(plaintext, this.secret)
  }
}
