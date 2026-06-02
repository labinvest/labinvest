"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { faUserCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import voluntarioService from "@/services/voluntarioService";
import postagemService from "@/services/postagemService";

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface Servico {
  id: number;
  nome: string;
  preco: number;
}

interface Disponibilidade {
  diaSemana: number;
  horaInicio: string;
  horaFim: string;
}

interface Voluntario {
  id: number;
  formacao?: string;
  bio?: string;
  experiencia?: number;
  avaliacaoMedia: number;
  perfil: { id: number; nome: string };
  categoria?: { nome: string; descricao?: string } | null;
  servicos: { servico: Servico }[];
  disponibilidades: Disponibilidade[];
  _count: { avaliacoesRecebidas: number; postagens: number };
}

interface Postagem {
  id: number;
  titulo: string;
  conteudo: string;
  createdAt: string;
  voluntario?: { perfil?: { nome: string } };
}

export default function PerfilVoluntario() {
  const { id } = useParams();
  const router = useRouter();

  const [voluntario, setVoluntario] = useState<Voluntario | null>(null);
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    const numId = Number(id);
    const isValidId = id && !isNaN(numId) && numId > 0;

    // Se o ID não for numérico válido, busca o voluntário do usuário logado
    const fetchVoluntario = isValidId
      ? voluntarioService.getById(String(numId))
      : voluntarioService.getMe();

    fetchVoluntario
      .then((volData: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const vol = (volData as any)?.dados ?? volData;
        if (!vol?.id) { setNotFound(true); setLoading(false); return; }
        setVoluntario(vol);

        return postagemService.getAll({ voluntarioId: vol.id, limit: 4 });
      })
      .then((postsData: unknown) => {
        if (!postsData) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setPostagens(((postsData as any)?.postagens ?? []) as Postagem[]);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando perfil...
      </div>
    );
  }

  if (notFound || !voluntario) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Voluntário não encontrado.
      </div>
    );
  }

  const servicos = voluntario.servicos.map((vs) => vs.servico);

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 min-h-screen py-6">
      <div className="w-full max-w-5xl space-y-8 mx-auto px-4">

        {/* ── Header ── */}
        <div className="shadow-xl p-6 bg-white rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faUserCircle} className="text-green-700 text-8xl" />
            </div>

            <div className="flex flex-col text-left">
              <h2 className="font-bold text-gray-800 text-2xl">{voluntario.perfil.nome}</h2>
              {voluntario.formacao && (
                <p className="text-gray-600 text-sm sm:text-base">{voluntario.formacao}</p>
              )}
              {voluntario.categoria && (
                <span className="mt-1 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full w-fit">
                  {voluntario.categoria.nome}
                </span>
              )}
              {voluntario.bio && (
                <p className="text-gray-600 text-sm mt-3 leading-relaxed max-w-md">{voluntario.bio}</p>
              )}
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                {voluntario.experiencia != null && (
                  <span>{voluntario.experiencia} anos de experiência</span>
                )}
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  {voluntario.avaliacaoMedia.toFixed(1)}
                  {voluntario._count.avaliacoesRecebidas > 0 && (
                    <span>({voluntario._count.avaliacoesRecebidas} avaliações)</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => router.push(`/agendamento/solicitar?voluntarioId=${voluntario.id}`)}
            sx={{ borderRadius: "999px", textTransform: "none", fontWeight: 600, flexShrink: 0 }}
          >
            Solicitar Agendamento
          </Button>
        </div>

        {/* ── Áreas de Atuação (Serviços) ── */}
        {servicos.length > 0 && (
          <div className="rounded-2xl p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Áreas de Atuação
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicos.map((servico) => (
                <div
                  key={servico.id}
                  className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 bg-gray-50"
                >
                  <h3 className="text-base font-semibold text-gray-800">{servico.nome}</h3>
                  <p className="text-sm text-green-700 mt-1">
                    {servico.preco === 0 ? "Gratuito" : `R$ ${servico.preco}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Disponibilidade ── */}
        {voluntario.disponibilidades.length > 0 && (
          <div className="rounded-2xl p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Disponibilidade
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {voluntario.disponibilidades.map((d, i) => (
                <div
                  key={i}
                  className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center"
                >
                  <p className="text-sm font-semibold text-green-800">{DIAS[d.diaSemana]}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {d.horaInicio} – {d.horaFim}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Postagens Recentes ── */}
        <div className="rounded-2xl p-8 bg-white shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Postagens Recentes
          </h2>

          {postagens.length === 0 ? (
            <p className="text-center text-gray-400 py-6">Nenhuma postagem ainda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {postagens.map((post) => (
                <div
                  key={post.id}
                  onClick={() => router.push(`/postagens/${post.id}`)}
                  className="flex flex-col bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-4 cursor-pointer"
                >
                  <div className="space-y-2">
                    <h4 className="text-base font-semibold text-gray-900 line-clamp-2">
                      {post.titulo}
                    </h4>
                    <p className="text-xs text-gray-500">{formatarData(post.createdAt)}</p>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {post.conteudo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
        <Alert severity="success" onClose={() => setSnackbar(false)} sx={{ width: "100%" }}>
          Ação realizada com sucesso.
        </Alert>
      </Snackbar>
    </div>
  );
}
