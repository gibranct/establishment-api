import * as Yup from 'yup'

const userValidationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
})

export { userValidationSchema }
