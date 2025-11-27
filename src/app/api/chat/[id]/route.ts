/**
 * /api/chat/[id]
 * 
 * Métodos HTTP
 * - GET: consulta mensagens de uma conversa
 * - POST: envia nova mensagem
 * 
 * HTTP status code:
 * - 200 sucesso
 * - 201 created
 */

import { NextResponse } from "next/server";

export function GET(request: any, { params }: any) {
  return NextResponse.json([
    { 
      id: 1, 
      conversaId: Number(params.id), 
      remetente: "cliente", 
      conteudo: "Olá, gostaria de tirar algumas dúvidas sobre o planejamento financeiro.", 
      data: "2025-11-22T10:00:00" 
    },
    { 
      id: 2, 
      conversaId: Number(params.id), 
      remetente: "voluntario", 
      conteudo: "Olá! Claro, estou à disposição. Qual sua dúvida?", 
      data: "2025-11-22T10:05:00" 
    }
  ], { status: 200 });
}

export function POST(request: any, { params }: any) {
  return NextResponse.json({
    id: Date.now(),
    conversaId: Number(params.id),
    message: "Mensagem enviada com sucesso"
  }, { status: 201 });
}
