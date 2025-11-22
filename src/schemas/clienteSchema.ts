import * as yup from "yup";
export const clienteSchema =  yup.object().shape({
    nome: yup.string().required("Nome é obrigatório").min(2).max(50),
    sobrenome: yup.string().required("Sobrenome é obrigatório").min(2).max(50),
    email: yup.string().required("Email é obrigatório").email(),
    telefone: yup.string().required("Telefone é obrigatório").matches(/^[0-9]{10,15}$/),
    cpf: yup.string().required("CPF é obrigatório").matches(/^[0-9]{11}$/),
    dataNascimento: yup.date().required("Data de nascimento é obrigatória"),
    estadoCivil: yup.string().required("Estado civil é obrigatório"),
    profissao: yup.string().required("Profissão é obrigatória").max(100),
    rendaMensal: yup.string().required("Renda mensal é obrigatória"),
    cep: yup.string().required("CEP é obrigatório").matches(/^[0-9]{8}$/),
    cidade: yup.string().required("Cidade é obrigatória").max(100),
    estado: yup.string().required("Estado é obrigatório").length(2),
    objetivoFinanceiro: yup.string().required("Objetivo financeiro é obrigatório"),
    comoConheceu: yup.string().required("Como conheceu é obrigatório"),
    descricao: yup.string().required("Descrição é obrigatória").max(500),
});