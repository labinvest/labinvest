"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '../services/api';

type UserProfile = {
  id: number;
  nome?: string | null;
  telefone?: string | null;
  endereco?: string | null;
  cpf?: string | null;
};

type AdminUser = {
  id: number;
  email: string;
  role: 'ADMIN' | 'CLIENTE' | 'VOLUNTARIO' | string;
  ativo: boolean;
  createdAt?: string;
  updatedAt?: string;
  perfil?: UserProfile | null;
};

type DashboardData = {
  usuarios?: {
    total?: number;
    ativos?: number;
    inativos?: number;
  };
  voluntarios?: number;
  servicos?: number;
  agendamentos?: {
    total?: number;
    hoje?: number;
    porStatus?: Record<string, number>;
  };
  postagens?: number;
  avaliacoes?: number;
  usuariosPorRole?: Record<string, number>;
};

type SolicitacaoVoluntario = {
  id: number;
  status: 'PENDENTE' | 'APROVADA' | 'REJEITADA' | string;
  formacao?: string | null;
  bio?: string | null;
  experiencia?: number | null;
  documentos?: string[] | null;
  createdAt?: string;
  perfil?: {
    id: number;
    nome?: string | null;
    telefone?: string | null;
    user?: {
      id: number;
      email: string;
      role: string;
      ativo: boolean;
    };
  };
  categoria?: {
    id: number;
    nome: string;
  } | null;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<AdminUser[]>([]);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoVoluntario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [ativoFilter, setAtivoFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [solicitacaoLoadingId, setSolicitacaoLoadingId] = useState<number | null>(null);

  const roleLabel = (role?: string | null) => {
    if (!role) return 'Sem role';
    const normalized = role.toUpperCase();
    if (normalized === 'ADMIN') return 'Admin';
    if (normalized === 'CLIENTE') return 'Cliente';
    if (normalized === 'VOLUNTARIO') return 'Voluntário';
    return normalized;
  };

  const roleBadgeClass = (role?: string | null) => {
    const normalized = String(role || '').toUpperCase();
    if (normalized === 'ADMIN') return 'bg-gray-900 text-white';
    if (normalized === 'VOLUNTARIO') return 'bg-emerald-100 text-emerald-800';
    return 'bg-blue-100 text-blue-800';
  };

  const formatDate = (value?: string) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const loadData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const perfilRes = await fetchAPI('/auth/perfil');
      const role = String(perfilRes?.dados?.role || '').toLowerCase();

      if (role !== 'admin') {
        router.replace('/home');
        return;
      }

      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '10');
      if (search.trim()) params.set('search', search.trim());
      if (roleFilter) params.set('role', roleFilter);
      if (ativoFilter) params.set('ativo', ativoFilter);

      const [usersRes, dashboardRes, solicitacoesRes] = await Promise.all([
        fetchAPI(`/admin/usuarios?${params.toString()}`),
        fetchAPI('/admin/dashboard?tipo=completo'),
        fetchAPI('/admin/solicitacoes-voluntario?status=PENDENTE&limit=5'),
      ]);

      const usuariosData = usersRes?.dados || usersRes;
      const dashboardData = dashboardRes?.dados || dashboardRes;
      const solicitacoesData = solicitacoesRes?.dados || solicitacoesRes;

      if (usuariosData?.usuarios && Array.isArray(usuariosData.usuarios)) {
        setUsuarios(usuariosData.usuarios);
        setTotalPages(usuariosData.paginacao?.totalPaginas || 1);
      } else {
        setUsuarios([]);
        setTotalPages(1);
      }

      setDashboard(dashboardData || null);
      setSolicitacoes(Array.isArray(solicitacoesData?.solicitacoes) ? solicitacoesData.solicitacoes : []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar dados do admin');
    } finally {
      setLoading(false);
    }
  }, [ativoFilter, page, roleFilter, router, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeactivate = async (id: number) => {
    if (!confirm('Deseja desativar este perfil?')) return;
    setError(null);
    setActionLoadingId(id);

    try {
      const resp = await fetchAPI(`/admin/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (resp?.sucesso || resp == null) {
        setUsuarios(prev => prev.filter(p => p.id !== id));
      } else {
        setError(resp?.erro || resp?.message || 'Falha ao desativar usuário');
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro na requisição');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleChangeRole = async (id: number, currentRole: string) => {
    const nextRole = window.prompt('Digite a nova role (ADMIN, CLIENTE, VOLUNTARIO):', currentRole);
    if (!nextRole) return;

    const normalized = nextRole.trim().toUpperCase();
    if (!['ADMIN', 'CLIENTE', 'VOLUNTARIO'].includes(normalized)) {
      setError('Role inválida. Use ADMIN, CLIENTE ou VOLUNTARIO.');
      return;
    }

    setError(null);
    setActionLoadingId(id);

    try {
      const response = await fetchAPI(`/admin/usuarios/${id}/role`, {
        method: 'PATCH',
        body: { role: normalized },
      });

      const updatedUser = response?.dados || response;
      if (updatedUser?.role) {
        setUsuarios(prev => prev.map((usuario) => (usuario.id === id ? { ...usuario, role: updatedUser.role } : usuario)));
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao atualizar role');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleAprovarSolicitacao = async (id: number) => {
    if (!confirm('Aprovar esta solicitação e criar o cadastro de voluntário?')) return;
    setSolicitacaoLoadingId(id);
    setError(null);

    try {
      await fetchAPI(`/admin/solicitacoes-voluntario/${id}/aprovar`, { method: 'PATCH' });
      await loadData();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao aprovar solicitação');
    } finally {
      setSolicitacaoLoadingId(null);
    }
  };

  const handleRejeitarSolicitacao = async (id: number) => {
    const observacaoAdmin = window.prompt('Motivo da rejeição (opcional):', '') || '';
    setSolicitacaoLoadingId(id);
    setError(null);

    try {
      await fetchAPI(`/admin/solicitacoes-voluntario/${id}/rejeitar`, {
        method: 'PATCH',
        body: { observacaoAdmin },
      });
      await loadData();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao rejeitar solicitação');
    } finally {
      setSolicitacaoLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7faf7_0%,#ffffff_35%,#f3f8f3_100%)] px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Admin</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Gestão de Usuários</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Visualize email, role e status real vindos do banco, filtre os registros e faça ações rápidas sem sair da tela.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push('/home')}
              className="rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Voltar ao site
            </button>
          </div>

          {dashboard && (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <StatCard label="Usuários" value={dashboard.usuarios?.total ?? 0} accent="slate" />
              <StatCard label="Ativos" value={dashboard.usuarios?.ativos ?? 0} accent="emerald" />
              <StatCard label="Inativos" value={dashboard.usuarios?.inativos ?? 0} accent="rose" />
              <StatCard label="Voluntários" value={dashboard.voluntarios ?? 0} accent="amber" />
              <StatCard label="Postagens" value={dashboard.postagens ?? 0} accent="blue" />
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Buscar por nome ou email"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
            />

            <select
              value={roleFilter}
              onChange={(e) => {
                setPage(1);
                setRoleFilter(e.target.value);
              }}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
            >
              <option value="">Todas as roles</option>
              <option value="ADMIN">Admin</option>
              <option value="CLIENTE">Cliente</option>
              <option value="VOLUNTARIO">Voluntário</option>
            </select>

            <select
              value={ativoFilter}
              onChange={(e) => {
                setPage(1);
                setAtivoFilter(e.target.value);
              }}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
            >
              <option value="">Todos os status</option>
              <option value="true">Ativos</option>
              <option value="false">Inativos</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setPage(1);
                setSearch('');
                setRoleFilter('');
                setAtivoFilter('');
              }}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Limpar filtros
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {solicitacoes.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Solicitações pendentes de voluntário</h2>
                <p className="text-sm text-slate-500">Aprovação cria o vínculo no banco e muda a role para VOLUNTARIO.</p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold uppercase tracking-wide">Nome</th>
                    <th className="px-4 py-3 text-left font-semibold uppercase tracking-wide">Email</th>
                    <th className="px-4 py-3 text-left font-semibold uppercase tracking-wide">Formação</th>
                    <th className="px-4 py-3 text-left font-semibold uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-left font-semibold uppercase tracking-wide">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {solicitacoes.map((solicitacao) => (
                    <tr key={solicitacao.id}>
                      <td className="px-4 py-3 text-slate-800">{solicitacao.perfil?.nome || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{solicitacao.perfil?.user?.email || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{solicitacao.formacao || '—'}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                          {solicitacao.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={solicitacaoLoadingId === solicitacao.id}
                            onClick={() => handleAprovarSolicitacao(solicitacao.id)}
                            className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Aprovar
                          </button>
                          <button
                            type="button"
                            disabled={solicitacaoLoadingId === solicitacao.id}
                            onClick={() => handleRejeitarSolicitacao(solicitacao.id)}
                            className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Rejeitar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Usuários cadastrados</h2>
              <p className="text-sm text-slate-500">Mostrando email, role, status e perfil vinculado.</p>
            </div>
            {loading && <span className="text-sm text-slate-500">Carregando...</span>}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nome</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Criado em</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {!loading && usuarios.length === 0 && (
                  <tr>
                    <td className="px-5 py-8 text-sm text-slate-500" colSpan={7}>Nenhum usuário encontrado.</td>
                  </tr>
                )}

                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">{usuario.id}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{usuario.perfil?.nome || '—'}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{usuario.email}</td>
                    <td className="px-5 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${roleBadgeClass(usuario.role)}`}>
                        {roleLabel(usuario.role)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${usuario.ativo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                        {usuario.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{formatDate(usuario.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={actionLoadingId === usuario.id}
                          onClick={() => handleChangeRole(usuario.id, usuario.role)}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Alterar role
                        </button>
                        <button
                          type="button"
                          disabled={actionLoadingId === usuario.id || !usuario.ativo}
                          onClick={() => handleDeactivate(usuario.id)}
                          className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Desativar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
              Página {page} de {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page >= totalPages}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: 'slate' | 'emerald' | 'rose' | 'amber' | 'blue' }) {
  const colors: Record<typeof accent, string> = {
    slate: 'from-slate-900 to-slate-700',
    emerald: 'from-emerald-700 to-emerald-500',
    rose: 'from-rose-700 to-rose-500',
    amber: 'from-amber-700 to-amber-500',
    blue: 'from-blue-700 to-blue-500',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${colors[accent]}`} />
      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
    </div>
  );
}
