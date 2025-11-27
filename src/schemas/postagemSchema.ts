import * as yup from 'yup';

export const postagemSchema = yup.object({
    titulo: yup
        .string()
        .required('Título é obrigatório')
        .min(5, 'O título deve ter no mínimo 5 caracteres')
        .max(100, 'O título deve ter no máximo 100 caracteres'),
    conteudo: yup
        .string()
        .required('Conteúdo é obrigatório')
        .min(20, 'O conteúdo deve ter no mínimo 20 caracteres')
        .max(5000, 'O conteúdo deve ter no máximo 5000 caracteres'),
});
