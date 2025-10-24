"use client"
import CardVoluntario from "@/componentes/CardVoluntario";
import CardConsultor from "@/componentes/CardVoluntario"
import FiltroVoluntario from "@/componentes/FiltroVoluntario"
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
  const handleCategoriaChange = () => {}; 

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

        <div className="flex gap-2">
        <div className="w-full md:w-64">
          <FiltroVoluntario
            opcoes={categorias}
            categoriaAtiva={categoriaAtiva}
            onCategoriaChange={handleCategoriaChange}
          />
        </div>

        <div className="flex">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {voluntarios.map((voluntario) => (
            <CardVoluntario key={voluntario.id} voluntario={voluntario} />
          ))}
        </div>
        
      </div>
      </div>
    </main>
  );
}