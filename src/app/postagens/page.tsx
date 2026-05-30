"use client";
import { useEffect, useState } from "react";
import SidebarMiniaturas from "@/components/SideBarNoticias";
import Link from "next/link";
import postagemService from "@/services/postagemService";

const PLACEHOLDER_IMAGE = "/images/Image6.png";

interface Postagem {
  id: number;
  autor: string;
  titulo: string;
  data: string;
  conteudo: string;
  imagem: string;
  destaque: boolean;
}

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(p: any, index: number): Postagem {
  return {
    id: p.id,
    autor: p.voluntario?.perfil?.nome ?? "Voluntário",
    titulo: p.titulo ?? "",
    data: p.createdAt ? formatarData(p.createdAt) : "",
    conteudo: p.conteudo ?? "",
    imagem: PLACEHOLDER_IMAGE,
    destaque: index === 0,
  };
}

export default function PostagensVoluntarios() {
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postagemService
      .getAll({ limit: 10 })
      .then((data: { postagens?: unknown[] }) => {
        const lista = data?.postagens ?? [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setPostagens((lista as any[]).map(mapPost));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const destaque = postagens.find((p) => p.destaque);
  const outros = postagens.filter((p) => !p.destaque);
  const antigos = postagens.slice(1);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-500">
        Carregando postagens...
      </section>
    );
  }

  if (postagens.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-500">
        Nenhuma postagem encontrada.
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Postagens dos <span className="text-green-700">voluntários</span>
        </h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Acompanhe os relatos inspiradores de quem transforma comunidades com dedicação e empatia.
        </p>
        <div className="mt-6 h-1 w-24 bg-green-700 mx-auto rounded-full" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
          {destaque && (
            <Link href={`/postagens/${destaque.id}`}>
              <article className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                <img
                  src={destaque.imagem}
                  alt={`Imagem de ${destaque.autor}`}
                  className="w-full h-[500px] object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-white text-3xl font-bold mb-1">{destaque.titulo}</h3>
                  <p className="text-white text-sm mb-1">por {destaque.autor} · {destaque.data}</p>
                  <p className="text-white text-lg leading-relaxed line-clamp-2">{destaque.conteudo}</p>
                </div>
              </article>
            </Link>
          )}

          {outros.map((post) => (
            <Link key={post.id} href={`/postagens/${post.id}`}>
              <article className="flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition duration-300 p-4 cursor-pointer">
                <img
                  src={post.imagem}
                  alt={`Imagem de ${post.autor}`}
                  className="w-full md:w-1/3 h-64 object-cover rounded-lg"
                />
                <div className="md:w-2/3 space-y-2 text-left">
                  <h4 className="text-xl font-semibold text-gray-900">{post.titulo}</h4>
                  <p className="text-sm text-gray-500">por {post.autor} · {post.data}</p>
                  <p className="text-gray-700 text-base leading-relaxed line-clamp-3">{post.conteudo}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <SidebarMiniaturas posts={antigos} />
      </div>
    </section>
  );
}
