import { NextResponse } from "next/server";

const MOCK_VOLUNTARIOS = [
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
    },
    { 
      id: 4, 
      nome: "Pedro Oliveira", 
      titulo: "Investidora", 
      especializacoes: ["Ações", "Fundos Imobiliários"], 
      categoria: "Finanças", 
      imagem_perfil: ""
    },
    { 
      id: 5, 
      nome: "Juliana Costa", 
      titulo: "Estudante de contabilidade", 
      especializacoes: ["Excel", "Análise de dados"], 
      categoria: "Finanças", 
      imagem_perfil: ""
    },
    { 
      id: 6, 
      nome: "Rafael Lima", 
      titulo: "Organizador de finanças pessoais", 
      especializacoes: ["Orçamento familiar", "Planejamento de aposentadoria"], 
      categoria: "Finanças", 
      imagem_perfil: ""
    },
];

export async function GET() {
    return NextResponse.json(MOCK_VOLUNTARIOS, { status: 200 });
}