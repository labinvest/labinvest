'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardVoluntario from './CardVoluntario';
import voluntarioService from '@/services/voluntarioService';

interface Voluntario {
  id: string | number;
  nome: string;
  titulo?: string;
  especializacoes: string[];
  imagem_perfil?: string;
}

function VoluntarioSidebar() {
  const router = useRouter();
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);

  useEffect(() => {
    voluntarioService
      .getAll({ limit: 2 })
      .then((data: { voluntarios?: unknown[] }) => {
        const lista: unknown[] = data?.voluntarios ?? [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = lista.map((v: any) => ({
          id: v.id,
          nome: v.perfil?.nome ?? v.nome ?? '',
          titulo: v.formacao ?? v.categoria?.nome ?? '',
          especializacoes:
            v.servicos?.map((s: any) => s.servico?.nome).filter(Boolean) ??
            (v.categoria?.nome ? [v.categoria.nome] : []),
          imagem_perfil: v.imagem_perfil ?? '',
        }));
        setVoluntarios(mapped);
      })
      .catch(() => {});
  }, []);

  if (voluntarios.length === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Conheça nossos Especialistas
      </h3>
      <div className="flex flex-col gap-4">
        {voluntarios.map((voluntario) => (
          <CardVoluntario key={voluntario.id} voluntario={voluntario} />
        ))}
      </div>
      <button
        onClick={() => router.push('/voluntario')}
        aria-label="Ver todos os especialistas disponíveis"
        className="text-blue-600 font-semibold hover:underline mt-4"
      >
        Ver mais
      </button>
    </div>
  );
}

export default VoluntarioSidebar;
