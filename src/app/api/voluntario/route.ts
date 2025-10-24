import { NextResponse } from "next/server";

const MOCK_VOLUNTARIOS = [
    { 
      id: 1, 
      nome: "Ana Beatriz", 
      titulo: "Marketing Digital", 
      especializacoes: ["SEO", "Mídias Sociais"], 
      categoria: "Marketing", 
      imagem_perfil: "" 
    },
    { 
      id: 2, 
      nome: "Carlos Silva", 
      titulo: "Desenvolvedor Web", 
      especializacoes: ["Frontend", "Backend"], 
      categoria: "Desenvolvimento", 
      imagem_perfil: ""
    },
    { 
      id: 3, 
      nome: "Mariana Souza", 
      titulo: "Designer Gráfico", 
      especializacoes: ["UI/UX", "Branding"], 
      categoria: "Design", 
      imagem_perfil: ""
    },
    { 
      id: 4, 
      nome: "Pedro Oliveira", 
      titulo: "Analista de Dados", 
      especializacoes: ["SQL", "Python"], 
      categoria: "Dados", 
      imagem_perfil: ""
    },
    { 
      id: 5, 
      nome: "Juliana Costa", 
      titulo: "Especialista em Marketing", 
      especializacoes: ["Content Marketing", "Email Marketing"], 
      categoria: "Marketing", 
      imagem_perfil: ""
    },
    { 
      id: 6, 
      nome: "Rafael Lima", 
      titulo: "Engenheiro de Software", 
      especializacoes: ["Java", "C#"], 
      categoria: "Desenvolvimento", 
      imagem_perfil: ""
    },
];

export function GET() {
    return NextResponse.json(MOCK_VOLUNTARIOS, { status: 200 });
}