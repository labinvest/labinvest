"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/services/api";

type Perfil = {
  id: string;
  nome: string;
  email: string;
  role: string;
};

type Solicitacao = {
  id: number;
  status: "PENDENTE" | "APROVADA" | "REJEITADA";
  formacao?: string | null;
  bio?: string | null;
  experiencia?: number | null;
  documentos?: string[] | null;
  createdAt?: string;
};

export default function SolicitarVoluntarioPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [solicitacao, setSolicitacao] = useState<Solicitacao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    categoriaId: '',
    formacao: '',
    bio: '',
    experiencia: '',
    documentos: '',
  });

  useEffect(() => {
    const load = async () => {
      setCarregando(true);
      setErro(null);

      try {
        const perfilRes = await fetchAPI('/auth/perfil');
        const perfilAtual = perfilRes?.dados || null;

        if (!perfilAtual?.perfil?.id) {
          throw new Error('Faça login para solicitar acesso como voluntário.');
        }

        const solicitacaoRes = await fetchAPI('/solicitacoes-voluntario/minhas');
        const solicitacaoAtual = solicitacaoRes?.dados || null;

        setPerfil({
          id: String(perfilAtual.perfil.id),
          nome: perfilAtual.perfil.nome || 'Usuário',
          email: perfilAtual.email,
          role: String(perfilAtual.role || '').toUpperCase(),
        });

        if (solicitacaoAtual) {
          setSolicitacao({
            id: solicitacaoAtual.id,
            status: solicitacaoAtual.status,
            formacao: solicitacaoAtual.formacao,
            bio: solicitacaoAtual.bio,
            experiencia: solicitacaoAtual.experiencia,
            documentos: solicitacaoAtual.documentos,
            createdAt: solicitacaoAtual.createdAt,
          });

          setFormData({
            categoriaId: solicitacaoAtual.categoriaId ? String(solicitacaoAtual.categoriaId) : '',
            formacao: solicitacaoAtual.formacao || '',
            bio: solicitacaoAtual.bio || '',
            experiencia: solicitacaoAtual.experiencia ? String(solicitacaoAtual.experiencia) : '',
            documentos: Array.isArray(solicitacaoAtual.documentos) ? solicitacaoAtual.documentos.join(', ') : '',
          });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro('Não foi possível carregar sua solicitação.');
        }
      } finally {
        setCarregando(false);
      }
    };

    load();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnviando(true);
    setMensagem(null);
    setErro(null);

    try {
      const response = await fetchAPI('/solicitacoes-voluntario', {
        method: 'POST',
        body: {
          categoriaId: formData.categoriaId || undefined,
          formacao: formData.formacao,
          bio: formData.bio,
          experiencia: formData.experiencia || undefined,
          documentos: formData.documentos,
        },
      });

      const dados = response?.dados || null;
      setSolicitacao(dados);
      setMensagem('Solicitação enviada com sucesso. Agora aguarde a aprovação do admin.');
      if (dados) {
        setFormData({
          categoriaId: dados.categoriaId ? String(dados.categoriaId) : '',
          formacao: dados.formacao || '',
          bio: dados.bio || '',
          experiencia: dados.experiencia ? String(dados.experiencia) : '',
          documentos: Array.isArray(dados.documentos) ? dados.documentos.join(', ') : '',
        });
      }
    } catch (error: unknown) {
      setErro(error instanceof Error ? error.message : 'Erro ao enviar solicitação');
    } finally {
      setEnviando(false);
    }
  };

  if (carregando) {
    return <div className="p-6 text-sm text-slate-600">Carregando solicitação...</div>;
  }

  if (erro && !perfil) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{erro}</div>
        <button type="button" onClick={() => router.push('/')} className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Ir para login
        </button>
      </div>
    );
  }

  const isVoluntario = perfil?.role === 'VOLUNTARIO';
  const statusLabel = solicitacao?.status ? solicitacao.status.toLowerCase() : 'sem solicitação';

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7faf7_0%,#ffffff_35%,#f3f8f3_100%)] px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Solicitação de voluntário</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Quero ser voluntário</h1>
          <p className="mt-2 text-sm text-slate-600">
            Preencha seus dados e envie a solicitação. O admin vai analisar e, se aprovar, sua conta será vinculada como voluntário.
          </p>
          <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Logado como <strong>{perfil?.nome}</strong> • {perfil?.email}
          </div>
        </section>

        {solicitacao && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Status da sua solicitação</h2>
            <p className="mt-2 text-sm text-slate-600">Situação atual: <strong>{statusLabel}</strong></p>
            {solicitacao.status === 'PENDENTE' && <p className="mt-2 text-sm text-amber-700">Sua solicitação está aguardando análise do admin.</p>}
            {solicitacao.status === 'APROVADA' && <p className="mt-2 text-sm text-emerald-700">Aprovada. Sua conta já pode acessar o painel de voluntário.</p>}
            {solicitacao.status === 'REJEITADA' && <p className="mt-2 text-sm text-rose-700">Rejeitada. Você pode reenviar o formulário com ajustes.</p>}
          </section>
        )}

        {isVoluntario && (
          <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900 shadow-sm">
            Sua conta já tem role de voluntário. Você pode ir direto para o painel.
            <div className="mt-4">
              <button type="button" onClick={() => router.push('/voluntario/painel')} className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
                Abrir painel do voluntário
              </button>
            </div>
          </section>
        )}

        {!isVoluntario && (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Categoria ID</span>
                <input
                  value={formData.categoriaId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, categoriaId: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white"
                  placeholder="Opcional"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Experiência (anos)</span>
                <input
                  type="number"
                  min="0"
                  value={formData.experiencia}
                  onChange={(e) => setFormData((prev) => ({ ...prev, experiencia: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white"
                  placeholder="Ex.: 2"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
              <span>Formação</span>
              <input
                value={formData.formacao}
                onChange={(e) => setFormData((prev) => ({ ...prev, formacao: e.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white"
                placeholder="Ex.: Administração, Pedagogia, Enfermagem"
              />
            </label>

            <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
              <span>Bio / apresentação</span>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                rows={5}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white"
                placeholder="Conte um pouco sobre você e por que quer ser voluntário"
              />
            </label>

            <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
              <span>Documentos / observações</span>
              <textarea
                value={formData.documentos}
                onChange={(e) => setFormData((prev) => ({ ...prev, documentos: e.target.value }))}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white"
                placeholder="Liste os documentos que vai anexar, por exemplo: RG, CPF, Comprovante de residência"
              />
            </label>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={enviando}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enviando ? 'Enviando...' : 'Enviar solicitação'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/home')}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Voltar
              </button>
            </div>

            {mensagem && <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{mensagem}</div>}
            {erro && <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{erro}</div>}
          </form>
        )}
      </div>
    </div>
  );
}