'use client';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface Voluntario {
  id: string | number;
  imagem_perfil?: string;
  nome: string;
  titulo?: string;
  especializacoes: string[];
}

type Props = {
  voluntario: Voluntario;
};

function CardVoluntario({ voluntario }: Props) {
  const router = useRouter();
  return (

    <button onClick={() => router.push(`/voluntario/${voluntario.id}`)}
    aria-label={`Ver perfil de ${voluntario.nome}, ${voluntario.titulo || 'voluntário'}`}
    className="flex items-start h-full p-4 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer w-full text-left">

      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center" aria-hidden="true">
        <FontAwesomeIcon icon={faUser} className="text-gray-600 text-4xl" />
      </div>
      
      <div className="ml-4">
        <h3 className="font-bold text-lg text-gray-900">{voluntario.nome}</h3>
        <p className="text-sm text-gray-600">{voluntario.titulo}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {voluntario.especializacoes.map((espec) => (
            <span
              key={espec}
              className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full"
            >
              {espec}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default CardVoluntario;