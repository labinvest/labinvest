/**
 * /api/cliente
 * 
 * Métodos HTTP
 * - GET: consulta todos os clientes
 * - POST: inserção de novo cliente
 * 
 * HTTP status code:
 * - 200 sucesso
 * - 201 created
 * - 400 bad request
 */

import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json([
    {
      id: "1",
      nome: "João",
      sobrenome: "Silva",
      email: "joao.silva@email.com",
      telefone: "11987654321",
      cpf: "12345678901",
      dataNascimento: "1985-05-15",
      estadoCivil: "casado",
      profissao: "Engenheiro",
      rendaMensal: "5000_10000",
      cep: "01310100",
      cidade: "São Paulo",
      estado: "SP",
      objetivoFinanceiro: "investimento",
      comoConheceu: "google",
      descricao: "Quero começar a investir para o futuro da minha família"
    },
    {
      id: "2",
      nome: "Maria",
      sobrenome: "Santos",
      email: "maria.santos@email.com",
      telefone: "11912345678",
      cpf: "98765432109",
      dataNascimento: "1990-08-22",
      estadoCivil: "solteiro",
      profissao: "Professora",
      rendaMensal: "2000_5000",
      cep: "04567000",
      cidade: "São Paulo",
      estado: "SP",
      objetivoFinanceiro: "economia",
      comoConheceu: "indicacao",
      descricao: "Preciso de ajuda para organizar minhas finanças e economizar"
    }
  ], { status: 200 });
}

export function POST(request: any) {
  return NextResponse.json({
    id: "3",
    message: "Cliente cadastrado com sucesso"
  }, { status: 201 });
}
