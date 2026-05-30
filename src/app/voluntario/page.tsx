"use client";
import CardVoluntario from "@/components/CardVoluntario";
import FiltroVoluntario from "@/components/FiltroVoluntario";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import voluntarioService from "@/services/voluntarioService";

interface Voluntario {
  id: string | number;
  imagem_perfil?: string;
  nome: string;
  titulo?: string;
  especializacoes: string[];
}

export default function Voluntario() {
  const categorias = ["Emprestimos", "Investimento", "Finanças"];
  const categoriaAtiva = "todas";
  const handleCategoriaChange = () => {};

  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);

  useEffect(() => {
    voluntarioService
      .getAll()
      .then((data: { voluntarios?: unknown[] }) => {
        const lista = data?.voluntarios ?? (Array.isArray(data) ? data : []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = (lista as any[]).map((v) => ({
          id: v.id,
          nome: v.perfil?.nome ?? v.nome ?? "",
          titulo: v.formacao ?? v.categoria?.nome ?? "",
          especializacoes:
            v.servicos?.map((s: any) => s.servico?.nome).filter(Boolean) ??
            (v.categoria?.nome ? [v.categoria.nome] : []),
          imagem_perfil: v.imagem_perfil ?? "",
        }));
        setVoluntarios(mapped);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Nossos Voluntários</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <FiltroVoluntario
            opcoes={categorias}
            categoriaAtiva={categoriaAtiva}
            onCategoriaChange={handleCategoriaChange}
          />
        </div>

        <div className="flex-1 col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voluntarios.map((voluntario) => (
              <CardVoluntario key={voluntario.id} voluntario={voluntario} />
            ))}
          </div>
          <Pagination count={10} className="mt-6" />
        </div>
      </div>
    </main>
  );
}
