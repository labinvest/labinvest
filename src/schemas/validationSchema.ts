import * as Yup from 'yup';

export const validationSchema = Yup.object({
      nome: Yup.string().min(3, 'Mínimo 3 caracteres').required('Obrigatório'),
      sobrenome: Yup.string().min(3, 'Mínimo 3 caracteres').required('Obrigatório'),
      email: Yup.string().email('Email inválido').required('Obrigatório'),
      telefone: Yup.string().required('Obrigatório').matches(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, 'Telefone inválido (ex: (11) 98765-4321)'),
      cpf: Yup.string().required('Obrigatório').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (formato: XXX.XXX.XXX-XX)'),
      cnpj: Yup.string().matches(/^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/, 'CNPJ inválido (formato: XX.XXX.XXX/0001-XX)'),
      profissao: Yup.string().required('Obrigatório'),
      curso: Yup.string().required('Obrigatório'),
      instituicao: Yup.string().required('Obrigatório'),
      anoConclusao: Yup.number().min(1970, 'Ano deve ser maior ou igual a 1970').max(new Date().getFullYear(), `Ano não pode ser maior que ${new Date().getFullYear()}`).required('Obrigatório'),
      areaInteresse: Yup.string().required('Obrigatório'),
      certificados: Yup.array().of(Yup.string()).min(1, 'Selecione pelo menos um certificado'),
    });
    