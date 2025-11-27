/**
 * /api/postagens/[id]
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
    id: Number(params.id),
    titulo: "Como Começar a Investir com Pouco Dinheiro",
    conteudo: "Investir não é privilégio apenas de quem tem muito dinheiro. Com planejamento e conhecimento, é possível começar a construir seu patrimônio mesmo com valores pequenos.",
    imagemUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    dataPublicacao: "2025-11-15T10:00:00Z",
    autor: "Carlos Alberto Mendes",
    categoria: "Investimentos"
  }, { status: 200 });
}

export function PUT(request: any, { params }: any) {
  return NextResponse.json({
    id: Number(params.id),
    message: "Postagem atualizada com sucesso"
  }, { status: 200 });
}

export function DELETE(request: any, { params }: any) {
  return new NextResponse(null, { status: 204 });
}
