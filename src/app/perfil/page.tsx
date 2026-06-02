"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faBriefcase, faBullseye, faCalendarAlt, faCalendarPlus, faCheckCircle, faEnvelope, faExclamationTriangle, faLightbulb, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

type PerfilResponse = {
  id: number;
  email: string;
  role: string;
  ativo: boolean;
  perfil?: {
    id: number;
    nome?: string | null;
    telefone?: string | null;
    endereco?: string | null;
    cpf?: string | null;
  } | null;
};

type VoluntarioResponse = {
  id: number;
  categoria?: { nome?: string | null } | null;
  formacao?: string | null;
  bio?: string | null;
};

type Agendamento = {
  id: number;
  titulo?: string | null;
  descricao?: string | null;
  dataInicio: string;
  dataFim?: string | null;
  status: "AGENDADO" | "CONFIRMADO" | "REALIZADO" | "CANCELADO";
  local?: string | null;
  voluntario?: { id: number; nome?: string | null } | null;
  servico?: { id: number; nome?: string | null } | null;
};

export default function PerfilPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<PerfilResponse | null>(null);
  const [voluntario, setVoluntario] = useState<VoluntarioResponse | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loadingAgendamentos, setLoadingAgendamentos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const perfilRes = await fetchAPI('/auth/perfil');
        const perfilData = perfilRes?.dados || null;

        if (!perfilData) {
          throw new Error('Perfil não encontrado');
        }

        setPerfil(perfilData);

        try {
          const voluntarioRes = await fetchAPI('/voluntarios/me');
          setVoluntario(voluntarioRes?.dados || null);
        } catch {
          setVoluntario(null);
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Erro ao carregar perfil');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    const perfilId = perfil?.perfil?.id;
    if (!perfilId) return;

    setLoadingAgendamentos(true);
    const role = String(perfil?.role || '').toLowerCase();
    const param = role === 'voluntario' ? 'voluntarioPerfilId' : 'clientePerfilId';

    fetchAPI(`/agendamentos?${param}=${perfilId}`)
      .then((res: { sucesso: boolean; agendamentos?: Agendamento[] }) => {
        setAgendamentos(res?.agendamentos ?? []);
      })
      .catch(() => setAgendamentos([]))
      .finally(() => setLoadingAgendamentos(false));
  }, [perfil]);

  const nome = perfil?.perfil?.nome || 'Usuário';
  const email = perfil?.email || '—';
  const telefone = perfil?.perfil?.telefone || '—';
  const endereco = perfil?.perfil?.endereco || '—';
  const role = String(perfil?.role || '').toLowerCase();
  const isVoluntario = role === 'voluntario' || Boolean(voluntario);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-600">Carregando perfil...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
          <p className="font-semibold">Erro ao carregar perfil</p>
          <p className="mt-2 text-sm">{error}</p>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="mt-4 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-emerald-100 shadow-xl">
              <Image src="/images/avatar-placeholder.png" alt="Foto de perfil" width={128} height={128} className="h-full w-full object-cover" />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Meu perfil</p>
                <h1 className="mt-2 text-3xl font-bold text-gray-800">{nome}</h1>
                <p className="mt-2 text-sm font-medium text-gray-500">{perfil?.role || 'CLIENTE'}</p>
              </div>

              {voluntario?.bio ? (
                <div className="max-w-3xl rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-left text-gray-700">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Bio do voluntário</p>
                  <p className="mt-2 whitespace-pre-line leading-relaxed">{voluntario.bio}</p>
                </div>
              ) : (
                <p className="max-w-3xl text-gray-500">
                  {role === 'voluntario'
                    ? 'Sua bio ainda não foi preenchida. Use a tela de edição para adicionar uma descrição.'
                    : 'Aqui você pode ver suas informações de contato.'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-gray-800">Informações de contato</h2>
            <button
              type="button"
              onClick={() => router.push(`/perfil/editar/${perfil?.id ?? ''}`)}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              Editar perfil
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard icon={faUser} label="Nome" value={nome} />
            <InfoCard icon={faEnvelope} label="Email" value={email} />
            <InfoCard icon={faPhone} label="Telefone" value={telefone} />
            <InfoCard icon={faBriefcase} label="Endereço" value={endereco} />
          </div>
        </div>

        {/* Seção de agendamentos */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Meus Agendamentos</h2>
            </div>
            <button
              type="button"
              onClick={() => router.push('/agendamento/solicitar')}
              className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <FontAwesomeIcon icon={faCalendarPlus} />
              Novo agendamento
            </button>
          </div>

          {loadingAgendamentos ? (
            <p className="text-sm text-gray-500">Carregando agendamentos...</p>
          ) : agendamentos.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-8 text-gray-400">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-4xl" />
              <p className="text-sm">Nenhum agendamento encontrado.</p>
              <button
                type="button"
                onClick={() => router.push('/agendamento/solicitar')}
                className="rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition"
              >
                Solicitar meu primeiro agendamento
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {agendamentos.map((ag) => (
                <li
                  key={ag.id}
                  className="flex cursor-pointer items-center justify-between gap-4 py-4 hover:bg-slate-50 rounded-xl px-2 transition"
                  onClick={() => router.push(`/agendamento/${ag.id}`)}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-1 flex-shrink-0">
                      <FontAwesomeIcon icon={faCheckCircle} className={statusColor(ag.status)} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {ag.titulo || ag.servico?.nome || 'Agendamento'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatarData(ag.dataInicio)}
                        {ag.voluntario?.nome ? ` · ${ag.voluntario.nome}` : ''}
                        {ag.local ? ` · ${ag.local}` : ''}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={ag.status} />
                </li>
              ))}
            </ul>
          )}

          {agendamentos.length > 0 && (
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => router.push('/agendamento')}
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                Ver todos os agendamentos →
              </button>
            </div>
          )}
        </div>

        {isVoluntario && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <InfoBlock
              title="Dados do voluntário"
              icon={faBullseye}
              color="green"
              items={[
                ['Categoria', voluntario?.categoria?.nome || '—'],
                ['Formação', voluntario?.formacao || '—'],
                ['Bio', voluntario?.bio || '—'],
                ['Status', 'Ativo como voluntário'],
              ]}
            />
            <InfoBlock title="Motivação" icon={faLightbulb} color="blue" items={[[ 'Sobre você', voluntario?.bio || '—' ]]} />
            <InfoBlock
              title="Observações"
              icon={faExclamationTriangle}
              color="red"
              items={[[ 'CPF/Endereço', `${perfil?.perfil?.cpf || '—'} / ${endereco}` ]]} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

function formatarData(iso: string) {
  try {
    return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

function statusColor(status: string) {
  const map: Record<string, string> = {
    AGENDADO: 'text-blue-500',
    CONFIRMADO: 'text-emerald-600',
    REALIZADO: 'text-gray-400',
    CANCELADO: 'text-red-500',
  };
  return map[status] ?? 'text-gray-400';
}

const statusLabel: Record<string, string> = {
  AGENDADO: 'Agendado',
  CONFIRMADO: 'Confirmado',
  REALIZADO: 'Realizado',
  CANCELADO: 'Cancelado',
};

const statusBg: Record<string, string> = {
  AGENDADO: 'bg-blue-100 text-blue-700',
  CONFIRMADO: 'bg-emerald-100 text-emerald-700',
  REALIZADO: 'bg-gray-100 text-gray-600',
  CANCELADO: 'bg-red-100 text-red-600',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusBg[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {statusLabel[status] ?? status}
    </span>
  );
}

function InfoCard({ icon, label, value }: { icon: IconDefinition; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
      <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function InfoBlock({ title, icon, color, items }: { title: string; icon: IconDefinition; color: 'green' | 'blue' | 'red'; items: Array<[string, string]> }) {
  const styles = {
    green: 'bg-emerald-50 text-emerald-700',
    blue: 'bg-blue-50 text-blue-700',
    red: 'bg-red-50 text-red-700',
  } as const;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <div className={`rounded-full p-3 ${styles[color]}`}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.map(([label, value]) => (
          <div key={label}>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
