"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAPI } from "@/services/api";

type Perfil = { id: string; nome: string; email: string; foto?: string; role?: string };
type Voluntario = { id: string; perfil?: { id: string; nome?: string; telefone?: string }; categoria?: { id: string; nome?: string } };
type Agendamento = { id: string; data: string; clienteNome: string; status: string };
type Servico = { id: string; titulo: string; ativo: boolean };

export default function VoluntarioPainel() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [voluntario, setVoluntario] = useState<Voluntario | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setCarregando(true);
      setErro(null);
      try {
        const perfilRes = await fetchAPI("/auth/perfil");
        const perfilAtual = perfilRes?.dados || null;

        if (!perfilAtual?.perfil?.id) {
          throw new Error("Não foi possível localizar seu perfil.");
        }

        let voluntarioAtual: Voluntario | null = null;
        try {
          const voluntarioRes = await fetchAPI("/voluntarios/me");
          voluntarioAtual = voluntarioRes?.dados || null;
        } catch (voluntarioError: unknown) {
          if (!(voluntarioError instanceof Error) || !voluntarioError.message.includes("Voluntário não encontrado")) {
            throw voluntarioError;
          }
        }

        const agendamentosRes = await fetchAPI(`/agendamentos?voluntarioPerfilId=${perfilAtual.perfil.id}&limit=20`);
        const servicosRes = voluntarioAtual?.id
          ? await fetchAPI(`/voluntario-servico/voluntario/${voluntarioAtual.id}`)
          : null;

        setPerfil({
          id: String(perfilAtual.id),
          nome: perfilAtual.perfil?.nome || "Voluntário",
          email: perfilAtual.email,
          role: perfilAtual.role,
        });
        setVoluntario(voluntarioAtual);
        setAgendamentos(agendamentosRes?.dados || agendamentosRes?.agendamentos || agendamentosRes?.items || []);
        setServicos(servicosRes?.dados || servicosRes || []);
        setCarregado(true);
      } catch (e: unknown) {
        console.error('Erro ao carregar painel do voluntário:', e);
        if (e instanceof Error) {
          setErro(e.message);
        } else {
          setErro(String(e));
        }
      } finally {
        setCarregando(false);
      }
    }
    load();
  }, []);

  if (carregando) return <div>Carregando painel...</div>;

  if (erro) return (
    <div className="p-6">
      <div className="mb-4 text-red-600">Erro ao carregar painel: {erro}</div>
      <button className="btn" onClick={() => { setCarregando(true); setErro(null); window.location.reload(); }}>Tentar novamente</button>
    </div>
  );

  return (
    <div className="p-6">
      <header className="flex items-center gap-4 mb-6">
        <Image src={perfil?.foto || "/images/avatar-placeholder.png"} alt="avatar" width={64} height={64} className="rounded-full" />
        <div>
          <h1 className="text-2xl font-semibold">{perfil?.nome}</h1>
          <p className="text-sm text-gray-500">{perfil?.email}</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card">Agendamentos futuros: <strong>{agendamentos.length}</strong></div>
        <div className="card">Serviços ativos: <strong>{servicos.filter(s => s.ativo).length}</strong></div>
        <div className="card">Avaliação média: <strong>{voluntario?.id ? '-' : 'N/A'}</strong></div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-medium mb-2">Próximos agendamentos</h2>
        <ul className="space-y-2">
          {agendamentos.map(a => (
            <li key={a.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{new Date(a.data).toLocaleString()}</div>
                <div className="text-sm text-gray-600">{a.clienteNome} • {a.status}</div>
              </div>
              <div className="space-x-2">
                <button className="btn">Detalhes</button>
                <button className="btn-outline">Recusar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">Meus serviços</h2>
        <ul className="space-y-2">
          {servicos.map(s => (
            <li key={s.id} className="p-3 border rounded flex justify-between items-center">
              <div>{s.titulo}</div>
              <div>{s.ativo ? "Ativo" : "Inativo"}</div>
            </li>
          ))}
        </ul>
      </section>

      {carregado && !voluntario && (
        <div className="mt-6 rounded border border-dashed p-4 text-sm text-gray-600">
          Seu usuário está autenticado, mas ainda não existe cadastro de voluntário vinculado ao perfil.
        </div>
      )}
    </div>
  );
}
