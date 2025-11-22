import { NextResponse } from "next/server";

const MOCK_CONVERSAS = [
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
    },
    {
        id: 3,
        voluntarioId: 3,
        voluntarioNome: "Roberto Silva Oliveira",
        clienteId: 101,
        clienteNome: "João Silva",
        ultimaMensagem: "Já enviei os documentos solicitados.",
        dataUltimaMensagem: "2025-11-21T16:45:00",
        naoLidas: 1
    },
    {
        id: 4,
        voluntarioId: 1,
        voluntarioNome: "Carlos Alberto Mendes",
        clienteId: 103,
        clienteNome: "Ana Costa",
        ultimaMensagem: "Perfeito, até semana que vem!",
        dataUltimaMensagem: "2025-11-20T09:00:00",
        naoLidas: 0
    }
];

export async function GET() {
    return NextResponse.json(MOCK_CONVERSAS, { status: 200 });
}
