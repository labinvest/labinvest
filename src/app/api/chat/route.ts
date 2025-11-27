/**
 * /api/chat
 * 
 * Métodos HTTP
 * - GET: consulta todas as conversas
 * - POST: cria nova conversa
 * 
 * HTTP status code:
 * - 200 sucesso
 * - 201 created
 */

import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json([
    {
      id: 1,
      voluntarioId: 1,
      voluntarioNome: "Carlos Alberto Mendes",
      clienteId: 101,
      clienteNome: "João Silva",
      ultimaMensagem: "Obrigado pela consultoria!",
      dataUltimaMensagem: "2025-11-22T14:30:00",
      naoLidas: 2
    },
    {
      id: 2,
      voluntarioId: 2,
      voluntarioNome: "Dra. Juliana Santos",
      clienteId: 102,
      clienteNome: "Maria Oliveira",
      ultimaMensagem: "Quando podemos agendar a próxima reunião?",
      dataUltimaMensagem: "2025-11-22T10:15:00",
      naoLidas: 0
    }
  ], { status: 200 });
}

export function POST(request: any) {
  return NextResponse.json({
    id: 5,
    message: "Conversa criada com sucesso"
  }, { status: 201 });
}
