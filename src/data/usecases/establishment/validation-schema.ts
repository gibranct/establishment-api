import * as Yup from 'yup'
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator'

const establishmentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  cnpj: Yup.string()
    .required('CNPJ é obrigatório')
    .test('cnpjValidation', 'CNPJ inválido', (value) =>
      cnpjValidator.isValid(String(value))
    ),
  address: Yup.object().shape({
    zipCode: Yup.string().required('CEP é obrigatório'),
    neighborhood: Yup.string().required('Bairro é obrigatório'),
    city: Yup.string().required('Cidade é obrigatória'),
    state: Yup.string().required('Estado é obrigatório'),
    street: Yup.string().required('Rua é obrigatória'),
  }),
})

export { establishmentValidationSchema }
