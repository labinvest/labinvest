import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const dataDir = path.join(process.cwd(), 'src', 'data');
    const filePath = path.join(dataDir, 'voluntarios.json');

    await fs.mkdir(dataDir, { recursive: true });

    let existing = [];
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      existing = JSON.parse(content);
    } catch (e) {
      existing = MOCK_VOLUNTARIOS.slice();
    }

    const newId = existing.length ? Math.max(...existing.map((v: any) => v.id || 0)) + 1 : 1;
    const novo = { id: newId, ...body };
    existing.push(novo);

    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf-8');

    return NextResponse.json(novo, { status: 201 });
  } catch (err) {
    console.error('Erro ao salvar voluntário:', err);
    return NextResponse.json({ error: 'Erro ao salvar voluntário' }, { status: 500 });
  }
}