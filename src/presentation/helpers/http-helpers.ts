import { HttpResponse } from '@/presentation/protocols/controller'

export const badRequest = (error: Error): HttpResponse => ({
  status: 400,
  title: 'Campos Inválidos',
  message: error.message,
})

export const notFound = (errorMessage: string): HttpResponse => ({
  status: 404,
  title: 'Recurso não encontrado',
  message: errorMessage,
})

export const serverError = (error: Error): HttpResponse => ({
  status: 500,
  title: 'Erro Interno no Servidor',
  message: error.message,
})

export const ok = (
  data: any,
  message?: string,
  total?: number
): HttpResponse => ({
  status: 200,
  message,
  data,
  totalRegisters: total,
})

export const created = (data: any, message?: string): HttpResponse => ({
  status: 201,
  message,
  data,
})

export const unauthorized = (): HttpResponse => ({
  status: 401,
  title: 'Usuário não Autenticado',
  message: 'Você precisa estar autenticado para acessar este recurso',
})
