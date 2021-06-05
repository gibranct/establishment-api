import { User } from '@/domain/entities'
import { CreateUserProps } from '@/data/usecases/user/create'

export interface UserRepository {
  create: (account: CreateUserProps) => Promise<User>

  findByEmail: (email: string) => Promise<User | null>
}
