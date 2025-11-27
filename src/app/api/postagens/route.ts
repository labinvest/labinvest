/**
 * /api/postagens
 * 
 * Métodos HTTP
 * - GET: consulta todas as postagens
 * - POST: inserção de nova postagem
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
      titulo: "Como Começar a Investir com Pouco Dinheiro",
      conteudo: "Investir não é privilégio apenas de quem tem muito dinheiro. Com planejamento e conhecimento, é possível começar a construir seu patrimônio mesmo com valores pequenos.",
      imagemUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
      dataPublicacao: "2025-11-15T10:00:00Z",
      autor: "Carlos Alberto Mendes",
      categoria: "Investimentos"
    },
    {
      id: 2,
      titulo: "Educação Financeira: Por Onde Começar?",
      conteudo: "A educação financeira é a base para uma vida financeira saudável e próspera. Muitas pessoas sentem dificuldade em lidar com dinheiro porque nunca aprenderam os conceitos básicos.",
      imagemUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
      dataPublicacao: "2025-11-10T14:30:00Z",
      autor: "Dra. Juliana Santos",
      categoria: "Educação Financeira"
    },
    {
      id: 3,
      titulo: "Planejamento Financeiro para 2026",
      conteudo: "O fim do ano está se aproximando e é o momento ideal para planejar suas finanças para o próximo ano.",
      imagemUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
      dataPublicacao: "2025-11-20T09:00:00Z",
      autor: "Roberto Silva Oliveira",
      categoria: "Planejamento"
    }
  ], { status: 200 });
}

export function POST(request: any) {
  return NextResponse.json({
    id: 4,
    message: "Postagem criada com sucesso"
  }, { status: 201 });
}