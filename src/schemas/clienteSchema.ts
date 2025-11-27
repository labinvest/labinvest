import * as yup from "yup";
import { cpf } from 'cpf-cnpj-validator';

export const clienteSchema = yup.object().shape({
    nome: yup.string().required("Nome é obrigatório").min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
    sobrenome: yup.string().required("Sobrenome é obrigatório").min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
    email: yup.string().required("Email é obrigatório").email("Email inválido"),
    
    telefone: yup.string()
        .required("Telefone é obrigatório")
        .test("telefone-valido", "Telefone deve ter 10 ou 11 dígitos (XX) 9XXXX-XXXX", (value) => {
            if (!value) return false;
            const numeros = value.replace(/\D/g, '');
            return numeros.length === 10 || numeros.length === 11;
        }),
    
    cpf: yup.string()
        .required("CPF é obrigatório")
        .test("cpf-valido", "CPF inválido", (value) => {
            if (!value) return false;
            return cpf.isValid(value);
        }),
    
    dataNascimento: yup.string()
        .required("Data de nascimento é obrigatória")
        .test("data-valida", "Data inválida", (value) => {
            if (!value) return false;
            const date = new Date(value);
            return !isNaN(date.getTime());
        })
        .test("maioridade", "Deve ser maior de 18 anos", (value) => {
            if (!value) return false;
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age >= 18;
        }),
    
    estadoCivil: yup.string()
        .required("Estado civil é obrigatório")
        .oneOf(["solteiro", "casado", "divorciado", "viuvo", "uniao_estavel"], "Estado civil inválido"),
    
    profissao: yup.string().required("Profissão é obrigatória").max(100, "Máximo 100 caracteres"),
    
    rendaMensal: yup.string()
        .required("Renda mensal é obrigatória")
        .oneOf(["ate_2000", "2000_5000", "5000_10000", "10000_20000", "acima_20000"], "Renda mensal inválida"),
    
    cep: yup.string()
        .required("CEP é obrigatório")
        .test("cep-format", "CEP deve estar formatado como XXXXX-XXX", (value) => {
            if (!value) return false;
            return /^\d{5}-\d{3}$/.test(value);
        })
        .test("cep-valido", "CEP deve ter 8 dígitos", (value) => {
            if (!value) return false;
            return true;
        }),
    
    cidade: yup.string().required("Cidade é obrigatória").max(100, "Máximo 100 caracteres"),
    
    estado: yup.string()
        .required("Estado é obrigatório")
        .length(2, "Estado deve ter 2 caracteres (ex: SP)")
        .matches(/^[A-Z]{2}$/, "Estado deve ser em maiúsculas (ex: SP)"),
    
    objetivoFinanceiro: yup.string()
        .required("Objetivo financeiro é obrigatório")
        .oneOf(["economia", "investimento", "dividas", "aposentadoria", "imovel", "educacao", "outros"], "Objetivo financeiro inválido"),
    
    comoConheceu: yup.string()
        .required("Como conheceu é obrigatório")
        .oneOf(["redes_sociais", "google", "indicacao", "faculdade", "evento", "outros"], "Opção inválida"),
    
    descricao: yup.string().required("Descrição é obrigatória").max(500, "Máximo 500 caracteres"),
});