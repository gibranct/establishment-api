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
    number: Yup.string().required('Número do endereço é obrigatório'),
    neighborhood: Yup.string().required('Bairro do endereço é obrigatório'),
    city: Yup.string().required('Cidade do endereço é obrigatória'),
    state: Yup.string().required('Estado do endereço é obrigatório'),
    street: Yup.string().required('Rua do endereço é obrigatória'),
  }),
})

export { establishmentValidationSchema }
