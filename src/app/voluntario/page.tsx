"use client";
import CardVoluntario from "@/components/CardVoluntario";
import FiltroVoluntario from "@/components/FiltroVoluntario";
import { Pagination, CircularProgress } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import voluntarioService from "@/services/voluntarioService";
import { fetchAPI } from "@/services/api";

const LIMIT = 9;

interface Voluntario {
  id: string | number;
  imagem_perfil?: string;
  nome: string;
  titulo?: string;
  especializacoes: string[];
}

interface Categoria {
  id: number;
  nome: string;
}

interface Paginacao {
  total: number;
  totalPaginas: number;
}

export default function VoluntarioListPage() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("todas");
  const [pagina, setPagina] = useState(1);
  const [paginacao, setPaginacao] = useState<Paginacao>({ total: 0, totalPaginas: 1 });
  const [carregando, setCarregando] = useState(true);

  // Carrega categorias uma vez
  useEffect(() => {
    fetchAPI("/categorias")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        const lista: Categoria[] = res?.categorias ?? res?.dados ?? [];
        setCategorias(lista);
      })
      .catch(() => {});
  }, []);

  // Carrega voluntários quando página ou categoria muda
  const carregarVoluntarios = useCallback(() => {
    setCarregando(true);

    const categoriaObj = categorias.find(
      (c) => c.nome.toLowerCase() === categoriaAtiva.toLowerCase()
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = { page: pagina, limit: LIMIT };
    if (categoriaObj) params.categoriaId = categoriaObj.id;

    voluntarioService
      .getAll(params)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => {
        const lista = data?.voluntarios ?? [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = lista.map((v: any) => ({
          id: v.id,
          nome: v.perfil?.nome ?? v.nome ?? "",
          titulo: v.formacao ?? v.categoria?.nome ?? "",
          especializacoes:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            v.servicos?.map((s: any) => s.servico?.nome).filter(Boolean) ??
            (v.categoria?.nome ? [v.categoria.nome] : []),
          imagem_perfil: v.imagem_perfil ?? "",
        }));
        setVoluntarios(mapped);
        setPaginacao({
          total: data?.paginacao?.total ?? 0,
          totalPaginas: data?.paginacao?.totalPaginas ?? 1,
        });
      })
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, [pagina, categoriaAtiva, categorias]);

  useEffect(() => {
    carregarVoluntarios();
  }, [carregarVoluntarios]);

  function handleCategoriaChange(categoria: string) {
    setCategoriaAtiva(categoria);
    setPagina(1); // volta para a primeira página ao mudar categoria
  }

  function handlePaginaChange(_: React.ChangeEvent<unknown>, novaPagina: number) {
    setPagina(novaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const nomesCategorias = categorias.map((c) => c.nome);

  return (
    <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Nossos Voluntários</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filtro de categorias */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FiltroVoluntario
            opcoes={nomesCategorias}
            categoriaAtiva={categoriaAtiva}
            onCategoriaChange={handleCategoriaChange}
          />
        </div>

        {/* Lista */}
        <div className="flex-1 flex flex-col gap-6">
          {carregando ? (
            <div className="flex justify-center items-center py-20">
              <CircularProgress color="success" />
            </div>
          ) : voluntarios.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              Nenhum voluntário encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {voluntarios.map((voluntario) => (
                <CardVoluntario key={voluntario.id} voluntario={voluntario} />
              ))}
            </div>
          )}

          {/* Paginação real */}
          {paginacao.totalPaginas > 1 && (
            <div className="flex flex-col items-center gap-1 mt-2">
              <Pagination
                count={paginacao.totalPaginas}
                page={pagina}
                onChange={handlePaginaChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
              <p className="text-xs text-gray-400">
                {paginacao.total} voluntário{paginacao.total !== 1 ? "s" : ""} encontrado{paginacao.total !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
