import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório")
    .max(254, "Email deve ter no máximo 254 caracteres"),
  password: yup
    .string()
    .required("senha é obrigatória")
    .min(5, "senha deve ter no mínimo 5 caracteres")
    .max(20, "senha deve ter no máximo 20 caracteres"),
});
