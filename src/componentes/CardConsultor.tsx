import React from 'react';
import { Link } from 'react-router-dom';

interface Consultor {
  id: string | number;
  imagem_perfil?: string;
  nome: string;
  titulo?: string;
  especializacoes: string[];
}

type Props = {
  consultor: Consultor;
};

function CardConsultor({ consultor }: Props) {
  return (

    <Link 
      to={`/consultor/${consultor.id}`} 
      className="flex p-4 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <img 
        src={consultor.imagem_perfil} 
        alt={consultor.nome} 
        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
      />
      <div className="ml-4">
        <h3 className="font-bold text-lg text-gray-900">{consultor.nome}</h3>
        <p className="text-sm text-gray-600">{consultor.titulo}</p>
    
        <div className="flex flex-wrap gap-2 mt-2">
          {consultor.especializacoes.map((espec) => (
            <span 
              key={espec} 
              className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full"
            >
              {espec}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default CardConsultor;