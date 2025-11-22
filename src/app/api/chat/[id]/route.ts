import { NextResponse } from "next/server";

const MOCK_MENSAGENS: Record<number, any[]> = {
    1: [
        { id: 1, conversaId: 1, remetente: "cliente", conteudo: "Olá, gostaria de tirar algumas dúvidas sobre o planejamento financeiro.", data: "2025-11-22T10:00:00" },
        { id: 2, conversaId: 1, remetente: "voluntario", conteudo: "Olá João! Claro, estou à disposição. Qual sua dúvida?", data: "2025-11-22T10:05:00" },
        { id: 3, conversaId: 1, remetente: "cliente", conteudo: "Queria entender melhor sobre como organizar minha reserva de emergência.", data: "2025-11-22T10:10:00" },
        { id: 4, conversaId: 1, remetente: "voluntario", conteudo: "Excelente pergunta! A reserva de emergência ideal é de 6 meses das suas despesas mensais. Vou te enviar um material sobre isso.", data: "2025-11-22T10:15:00" },
        { id: 5, conversaId: 1, remetente: "cliente", conteudo: "Obrigado pela consultoria!", data: "2025-11-22T14:30:00" }
    ],
    2: [
        { id: 6, conversaId: 2, remetente: "cliente", conteudo: "Boa tarde, Dra. Juliana!", data: "2025-11-22T09:00:00" },
        { id: 7, conversaId: 2, remetente: "voluntario", conteudo: "Boa tarde Maria! Como posso ajudar?", data: "2025-11-22T09:05:00" },
        { id: 8, conversaId: 2, remetente: "cliente", conteudo: "Quando podemos agendar a próxima reunião?", data: "2025-11-22T10:15:00" }
    ],
    3: [
        { id: 9, conversaId: 3, remetente: "voluntario", conteudo: "Olá João, preciso que você envie os comprovantes de renda.", data: "2025-11-21T14:00:00" },
        { id: 10, conversaId: 3, remetente: "cliente", conteudo: "Já enviei os documentos solicitados.", data: "2025-11-21T16:45:00" }
    ],
    4: [
        { id: 11, conversaId: 4, remetente: "cliente", conteudo: "Carlos, obrigado pela ajuda com o planejamento!", data: "2025-11-20T08:30:00" },
        { id: 12, conversaId: 4, remetente: "voluntario", conteudo: "Por nada Ana! Qualquer dúvida estou aqui.", data: "2025-11-20T08:45:00" },
        { id: 13, conversaId: 4, remetente: "cliente", conteudo: "Perfeito, até semana que vem!", data: "2025-11-20T09:00:00" }
    ]
};

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const conversaId = Number(params.id);
    const mensagens = MOCK_MENSAGENS[conversaId] || [];
    
    return NextResponse.json(mensagens, { status: 200 });
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const conversaId = Number(params.id);
    const body = await request.json();
    
    const novaMensagem = {
        id: Date.now(),
        conversaId,
        remetente: body.remetente,
        conteudo: body.conteudo,
        data: new Date().toISOString()
    };
    
    if (!MOCK_MENSAGENS[conversaId]) {
        MOCK_MENSAGENS[conversaId] = [];
    }
    
    MOCK_MENSAGENS[conversaId].push(novaMensagem);
    
    return NextResponse.json(novaMensagem, { status: 201 });
}
