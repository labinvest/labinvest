"use client"
import CardVoluntario from "@/componentes/CardVoluntario";
import FiltroVoluntario from "@/componentes/FiltroVoluntario"
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

interface Voluntario {
  id: string | number;
  imagem_perfil?: string;
  nome: string;
  titulo?: string;
  especializacoes: string[];
}


export default function Voluntario() {

  const categorias = ["Marketing", "Desenvolvimento", "Design", "Dados"];
  const categoriaAtiva = "todas";
  const handleCategoriaChange = () => { };

  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);

  useEffect(() => {
    fetch("/api/voluntario", {
      method: "GET"
    }).then((async (response) => {
      const data = await response.json();
      setVoluntarios(data);
    }));
  }, []);

  return (
    <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Nossos Voluntários
      </h1>

      <div className="flex flex-col md:flex-row gap-6">

        <div className="w-full md:w-64 flex-shrink-0">
          <FiltroVoluntario
            opcoes={categorias}
            categoriaAtiva={categoriaAtiva}
            onCategoriaChange={handleCategoriaChange}
          />
        </div>

        <div className="flex-1 col ">

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