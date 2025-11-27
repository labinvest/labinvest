/**
 * /api/voluntario
 * 
 * Métodos HTTP
 * - GET: consulta todos os voluntários
 * - POST: inserção de novo voluntário
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
      id: 1, 
      nome: "Ana Beatriz", 
      titulo: "Consultora Financeira", 
      especializacoes: ["Planejamento Financeiro", "Investimentos"], 
      categoria: "Finanças", 
      imagem_perfil: "" 
    },
    { 
      id: 2, 
      nome: "Carlos Silva", 
      titulo: "Coach Financeiro", 
      especializacoes: ["Orçamento Pessoal", "Dívidas"], 
      categoria: "Finanças", 
      imagem_perfil: ""
    },
    { 
      id: 3, 
      nome: "Mariana Souza", 
      titulo: "Contadora", 
      especializacoes: ["Impostos", "Auditoria"], 
      categoria: "Finanças", 
      imagem_perfil: ""
    }
  ], { status: 200 });
}

export function POST(request: any) {
  return NextResponse.json({
    id: 7,
    message: "Voluntário cadastrado com sucesso"
  }, { status: 201 });
}