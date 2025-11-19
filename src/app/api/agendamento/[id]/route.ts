const MOCK_AGENDAMENTOS = [
  {
    id: 1,
    titulo: "Consultoria de Planejamento Financeiro",
    data: "2025-11-22",
    hora: "10:00",
    tipo: "Finanças Pessoais",
    status: "Confirmado",
    local: "Escritório Lab Invest - Centro",
    profissional: "Carlos Alberto Mendes",
    observacoes: "Trazer documentos de renda, extratos bancários dos últimos 3 meses e lista de despesas fixas.",
  },
  {
    id: 2,
    titulo: "Análise de Investimentos",
    data: "2025-11-25",
    hora: "14:30",
    tipo: "Investimentos",
    status: "Pendente",
    local: "Reunião Online - Google Meet",
    profissional: "Dra. Juliana Santos",
    observacoes: "Apresentar perfil de investidor e objetivos financeiros de curto e longo prazo.",
  },
  {
    id: 3,
    titulo: "Renegociação de Dívidas",
    data: "2025-11-28",
    hora: "09:00",
    tipo: "Gestão de Dívidas",
    status: "Confirmado",
    local: "Lab Invest - Unidade Sul",
    profissional: "Roberto Silva Oliveira",
    observacoes: "Trazer contratos de empréstimos, faturas de cartão de crédito e comprovantes de renda.",
  },
  {
    id: 4,
    titulo: "Planejamento de Aposentadoria",
    data: "2025-12-02",
    hora: "16:00",
    tipo: "Previdência",
    status: "Pendente",
    local: "Escritório Lab Invest - Zona Norte",
    profissional: "Ana Paula Ferreira",
    observacoes: "Levar documentos de previdência atual, INSS e planos complementares.",
  },
  {
    id: 5,
    titulo: "Consultoria Empresarial",
    data: "2025-12-05",
    hora: "11:00",
    tipo: "Finanças Empresariais",
    status: "Confirmado",
    local: "Sede da Empresa Cliente",
    profissional: "Marcos Henrique Costa",
    observacoes: "Apresentar balanço patrimonial, DRE dos últimos 12 meses e fluxo de caixa projetado.",
  },
  {
    id: 6,
    titulo: "Educação Financeira",
    data: "2025-12-08",
    hora: "15:00",
    tipo: "Educação",
    status: "Cancelado",
    local: "Workshop Online - Zoom",
    profissional: "Patricia Almeida",
    observacoes: "Workshop sobre organização financeira familiar e criação de reserva de emergência.",
  },
];


import { NextResponse } from "next/server";
 
export function GET(request: Request,{ params }: any) {
    const id = Number(params.id);
    return NextResponse.json(MOCK_AGENDAMENTOS.find(agendamento => agendamento.id === id), { status: 200 });
}

export function PATCH(request: Request,{ params }: any) {
    const id = Number(params.id);
    const agendamentoIndex = MOCK_AGENDAMENTOS.findIndex(agendamento => agendamento.id === id);
    if (agendamentoIndex === -1) {
        return NextResponse.json({ message: "Agendamento não encontrado" }, { status: 404 });
    }
    const updatedData = request.json();
    MOCK_AGENDAMENTOS[agendamentoIndex] = { ...MOCK_AGENDAMENTOS[agendamentoIndex], ...updatedData };
    return NextResponse.json(MOCK_AGENDAMENTOS[agendamentoIndex], { status: 200 });
}