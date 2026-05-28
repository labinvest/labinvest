import * as Yup from 'yup';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export const validationSchema = Yup.object({
      nome: Yup.string().min(3, 'Mínimo 3 caracteres').required('Obrigatório'),
      sobrenome: Yup.string().min(3, 'Mínimo 3 caracteres').required('Obrigatório'),
      email: Yup.string().email('Email inválido').required('Obrigatório'),
      senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Obrigatório'),
      telefone: Yup.string()
        .required('Obrigatório')
        .test('telefone-valido', 'Telefone inválido (ex: (11) 98765-4321)', (value) => {
          if (!value) return false;
          const numeros = value.replace(/\D/g, '');
          return numeros.length === 10 || numeros.length === 11;
        }),
      cpf: Yup.string()
        .required('Obrigatório')
        .test('cpf-valido', 'CPF inválido', (value) => {
          if (!value) return false;
          return cpf.isValid(value);
        }),
      cnpj: Yup.string()
        .test('cnpj-valido', 'CNPJ inválido', (value) => {
          if (!value || value.trim() === '') return true; // CNPJ é opcional
          return cnpj.isValid(value);
        }),
      profissao: Yup.string().required('Obrigatório'),
      curso: Yup.string().required('Obrigatório'),
      instituicao: Yup.string().required('Obrigatório'),
      anoConclusao: Yup.number().min(1970, 'Ano deve ser maior ou igual a 1970').max(new Date().getFullYear(), `Ano não pode ser maior que ${new Date().getFullYear()}`).required('Obrigatório'),
      areaInteresse: Yup.string().required('Obrigatório'),
      certificados: Yup.array().of(Yup.string()).min(1, 'Selecione pelo menos um certificado'),
    });
    