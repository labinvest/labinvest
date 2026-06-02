"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/services/api";
import { faUserCircle, faStar, faCalendarCheck, faClipboardList, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  AGENDADO:   { label: "Agendado",   color: "bg-blue-100 text-blue-700" },
  CONFIRMADO: { label: "Confirmado", color: "bg-green-100 text-green-700" },
  REALIZADO:  { label: "Realizado",  color: "bg-gray-100 text-gray-700" },
  CANCELADO:  { label: "Cancelado",  color: "bg-red-100 text-red-700" },
};

function formatarData(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

interface Servico { id: number; nome: string; preco: number; ativo?: boolean }
interface VolServico { servico: Servico }
interface Agendamento {
  id: number;
  dataInicio: string;
  status: string;
  titulo?: string;
  local?: string;
  cliente?: { id: number; nome: string };
  servico?: { id: number; nome: string };
}
interface Voluntario {
  id: number;
  formacao?: string;
  bio?: string;
  avaliacaoMedia: number;
  servicos: VolServico[];
  categoria?: { nome: string };
  _count?: { avaliacoesRecebidas: number };
}

export default function VoluntarioPainel() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<{ nome: string; email: string } | null>(null);
  const [voluntario, setVoluntario] = useState<Voluntario | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [atualizando, setAtualizando] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const authRes = await fetchAPI("/auth/perfil");
        const user = authRes?.dados;
        if (!user?.perfil?.id) throw new Error("Perfil não encontrado.");

        setPerfil({ nome: user.perfil.nome || "Voluntário", email: user.email });

        const [volRes, agRes] = await Promise.all([
          fetchAPI("/voluntarios/me").catch(() => null),
          fetchAPI(`/agendamentos?voluntarioPerfilId=${user.perfil.id}&limit=20`),
        ]);

        const vol = volRes?.dados ?? null;
        setVoluntario(vol);
        setAgendamentos(agRes?.agendamentos ?? []);
      } catch (e: unknown) {
        setErro(e instanceof Error ? e.message : "Erro ao carregar painel.");
      } finally {
        setCarregando(false);
      }
    }
    load();
  }, []);

  async function atualizarStatus(id: number, status: string) {
    setAtualizando(id);
    try {
      await fetchAPI(`/agendamentos/${id}/status`, { method: "PATCH", body: { status } });
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch {
      alert("Erro ao atualizar status do agendamento.");
    } finally {
      setAtualizando(null);
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando painel...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-600">{erro}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-green-700 text-white rounded-lg">
          Tentar novamente
        </button>
      </div>
    );
  }

  const pendentes = agendamentos.filter((a) => a.status === "AGENDADO");
  const futuros   = agendamentos.filter((a) => a.status === "AGENDADO" || a.status === "CONFIRMADO");
  const servicos  = voluntario?.servicos ?? [];
  const ativos    = servicos.filter((vs) => vs.servico?.ativo !== false);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <FontAwesomeIcon icon={faUserCircle} className="text-green-700 text-6xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{perfil?.nome}</h1>
            <p className="text-sm text-gray-500">{perfil?.email}</p>
            {voluntario?.formacao && (
              <p className="text-sm text-green-700 mt-1">{voluntario.formacao}</p>
            )}
            {voluntario?.categoria && (
              <span className="inline-block mt-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                {voluntario.categoria.nome}
              </span>
            )}
          </div>
        </div>

        {/* ── Cards de resumo ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FontAwesomeIcon icon={faCalendarCheck} className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Agendamentos futuros</p>
              <p className="text-2xl font-bold text-gray-800">{futuros.length}</p>
              {pendentes.length > 0 && (
                <p className="text-xs text-orange-500">{pendentes.length} aguardando confirmação</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FontAwesomeIcon icon={faClipboardList} className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Serviços ativos</p>
              <p className="text-2xl font-bold text-gray-800">{ativos.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avaliação média</p>
              <p className="text-2xl font-bold text-gray-800">
                {voluntario?.avaliacaoMedia && voluntario.avaliacaoMedia > 0
                  ? voluntario.avaliacaoMedia.toFixed(1)
                  : "—"}
              </p>
              {voluntario?._count?.avaliacoesRecebidas != null && (
                <p className="text-xs text-gray-400">{voluntario._count.avaliacoesRecebidas} avaliações</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Próximos agendamentos ── */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Próximos agendamentos</h2>
          {futuros.length === 0 ? (
            <p className="text-gray-400 text-sm py-4 text-center">Nenhum agendamento futuro.</p>
          ) : (
            <ul className="space-y-3">
              {futuros.map((a) => {
                const info = STATUS_LABEL[a.status] ?? { label: a.status, color: "bg-gray-100 text-gray-700" };
                return (
                  <li key={a.id} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">{a.titulo || a.servico?.nome || "Atendimento"}</p>
                      <p className="text-sm text-gray-500">
                        {formatarData(a.dataInicio)}
                        {a.local && <span> · {a.local}</span>}
                      </p>
                      <p className="text-sm text-gray-600">
                        Cliente: <span className="font-medium">{a.cliente?.nome || "—"}</span>
                      </p>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${info.color}`}>
                        {info.label}
                      </span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => router.push(`/agendamento/${a.id}`)}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Detalhes
                      </button>
                      {a.status === "AGENDADO" && (
                        <>
                          <button
                            disabled={atualizando === a.id}
                            onClick={() => atualizarStatus(a.id, "CONFIRMADO")}
                            className="px-3 py-1.5 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition flex items-center gap-1"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                            Confirmar
                          </button>
                          <button
                            disabled={atualizando === a.id}
                            onClick={() => atualizarStatus(a.id, "CANCELADO")}
                            className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center gap-1"
                          >
                            <FontAwesomeIcon icon={faTimesCircle} className="text-xs" />
                            Recusar
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* ── Meus serviços ── */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Meus serviços</h2>
          {servicos.length === 0 ? (
            <p className="text-gray-400 text-sm py-4 text-center">Nenhum serviço vinculado.</p>
          ) : (
            <ul className="space-y-3">
              {servicos.map((vs) => (
                <li key={vs.servico.id} className="border border-gray-100 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{vs.servico.nome}</p>
                    <p className="text-sm text-gray-500">
                      {vs.servico.preco === 0 ? "Gratuito" : `R$ ${vs.servico.preco}`}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${vs.servico.ativo !== false ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {vs.servico.ativo !== false ? "Ativo" : "Inativo"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Aviso se não tem registro de voluntário ── */}
        {!voluntario && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-700">
            Seu usuário é voluntário mas ainda não possui um cadastro de voluntário vinculado.
            <button
              onClick={() => router.push("/voluntario/editar")}
              className="ml-2 underline font-semibold"
            >
              Completar cadastro
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
