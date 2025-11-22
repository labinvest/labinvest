'use client'; 
import React from 'react';
import { useRouter } from 'next/navigation';
import CardVoluntario from './CardVoluntario';

const voluntariosExemplo = [
  {
    id: '1',
    nome: 'Juliana',
    titulo: 'Especialista em Orçamento Pessoal',
    especializacoes: [],
  },
  {
    id: '2',
    nome: 'Marcos',
    titulo: 'Consultor de Investimentos',
    especializacoes: [],
  },
];

function VoluntarioSidebar() {
  const router = useRouter();

  const handleVerMais = () => {
    router.push('/voluntario');
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Conheça nossos Especialistas
      </h3>
      <div className="flex flex-col gap-4">
        {voluntariosExemplo.map((voluntario) => (
          <CardVoluntario key={voluntario.id} voluntario={voluntario} />
        ))}
      </div>
      <button
        onClick={handleVerMais}
        aria-label="Ver todos os especialistas disponíveis"
        className="text-blue-600 font-semibold hover:underline mt-4"
      >
        Ver mais
      </button>
    </div>
  );
}

export default VoluntarioSidebar;