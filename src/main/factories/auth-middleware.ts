import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware()
}
