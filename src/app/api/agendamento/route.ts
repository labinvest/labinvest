import { NextResponse } from "next/server";

const MOCK_AGENDAMENTOS = [{ id: 1, titulo: "Consultoria de Planejamento Financeiro", data: "2025-11-22", tipo: "Finanças Pessoais", status: "Confirmado" },
    { id: 2, titulo: "Análise de Investimentos", data: "2025-11-25", tipo: "Investimentos", status: "Pendente" },
    { id: 3, titulo: "Renegociação de Dívidas", data: "2025-11-28", tipo: "Gestão de Dívidas", status: "Confirmado" },
    { id: 4, titulo: "Planejamento de Aposentadoria", data: "2025-12-02", tipo: "Previdência", status: "Pendente" },
    { id: 5, titulo: "Consultoria Empresarial", data: "2025-12-05", tipo: "Finanças Empresariais", status: "Confirmado" },
    { id: 6, titulo: "Educação Financeira", data: "2025-12-08", tipo: "Educação", status: "Cancelado" }];

export function GET() {
    return NextResponse.json(MOCK_AGENDAMENTOS, { status: 200 });
}