/**
 * /api/cliente/[id]
 * 
 * Métodos HTTP
 * - GET: consulta por id
 * - PUT: alteração
 * - DELETE: exclusão
 * 
 * HTTP status code:
 * - 200 sucesso
 * - 204 no content
 * - 404 not found
 */

import { NextResponse } from "next/server";

export function GET(request: any, { params }: any) {
  return NextResponse.json({
    id: params.id,
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
  }, { status: 200 });
}

export function PUT(request: any, { params }: any) {
  return NextResponse.json({
    id: params.id,
    message: "Cliente atualizado com sucesso"
  }, { status: 200 });
}

export function DELETE(request: any, { params }: any) {
  return new NextResponse(null, { status: 204 });
}
