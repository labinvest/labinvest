"use client";

import React, { useEffect, useState } from 'react';
import { fetchAPI, API_URL } from '../services/api';

type Perfil = any;

export default function AdminDashboard() {
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAPI('/perfis');

        // Backend may return { sucesso: true, dados: [...] } or { sucesso: true, perfis: [...] }
        if (res && res.sucesso && Array.isArray(res.dados)) setPerfis(res.dados);
        else if (res && res.sucesso && Array.isArray(res.perfis)) setPerfis(res.perfis);
        else if (Array.isArray(res)) setPerfis(res);
        else setError('Resposta inesperada da API');
      } catch (e: any) {
        setError(e.message || 'Erro ao carregar perfis');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDeactivate = async (id: number) => {
    if (!confirm('Deseja desativar este perfil?')) return;
    setError(null);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // usar fetch direto para permitir DELETE simples
      const resp = await fetch(`${API_URL}/perfis/${id}`, { method: 'DELETE', headers });
      if (resp.ok) {
        setPerfis(prev => prev.filter(p => p.id !== id));
      } else {
        const body = await resp.json().catch(() => ({}));
        setError(body.erro || body.message || 'Falha ao desativar perfil');
      }
    } catch (e: any) {
      setError(e.message || 'Erro na requisição');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin — Gestão de Perfis</h1>

      {loading && <p>Carregando perfis...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && perfis.length === 0 && <p>Nenhum perfil encontrado.</p>}

      {perfis.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Nome</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Email / Telefone</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {perfis.map((p: Perfil) => (
              <tr key={p.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: 8 }}>{p.id}</td>
                <td style={{ padding: 8 }}>{p.nome || p.email || '—'}</td>
                <td style={{ padding: 8 }}>{p.email || p.telefone || '—'}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => alert('Implementar editar')}>Editar</button>
                  <button onClick={() => handleDeactivate(p.id)} style={{ marginLeft: 8 }}>Desativar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
