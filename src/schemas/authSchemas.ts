import * as Yup from 'yup'

export const loginSchema = Yup.object({
  username: Yup.string().required('Nome de usuário é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
})

export const registerSchema = Yup.object({
  nome: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'Senhas não coincidem')
    .required('Confirmação obrigatória'),
})
