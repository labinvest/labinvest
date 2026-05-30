"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SidebarMiniaturas from "@/components/SideBarNoticias";
import SuccessModal from "@/components/Modal";
import postagemService from "@/services/postagemService";

const PLACEHOLDER_IMAGE = "/images/Image6.png";

interface Postagem {
    id: number;
    titulo: string;
    autor: string;
    data: string;
    conteudo: string;
    imagem: string;
}

function formatarData(iso: string): string {
    return new Date(iso).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(p: any): Postagem {
    return {
        id: p.id,
        titulo: p.titulo ?? "",
        autor: p.voluntario?.perfil?.nome ?? "Voluntário",
        data: p.createdAt ? formatarData(p.createdAt) : "",
        conteudo: p.conteudo ?? "",
        imagem: PLACEHOLDER_IMAGE,
    };
}

export default function PaginaPostagem() {
    const { id } = useParams();
    const [post, setPost] = useState<Postagem | null>(null);
    const [outros, setOutros] = useState<Postagem[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '' });

    useEffect(() => {
        if (!id) return;

        Promise.all([
            postagemService.getById(id as string),
            postagemService.getAll({ limit: 5 }),
        ])
            .then(([postData, listData]) => {
                if (postData?.dados) {
                    setPost(mapPost(postData.dados));
                }
                const lista = listData?.postagens ?? [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setOutros((lista as any[]).map(mapPost).filter((p: Postagem) => p.id !== Number(id)));
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <section className="max-w-4xl mx-auto px-6 py-16 text-center text-gray-500">
                Carregando postagem...
            </section>
        );
    }

    if (notFound || !post) {
        return (
            <section className="max-w-4xl mx-auto px-6 py-16 text-center text-gray-500">
                Postagem não encontrada.
            </section>
        );
    }

    return (
        <>
            <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-3 space-y-8">
                    <img
                        src={post.imagem}
                        alt={`Imagem de ${post.titulo}`}
                        className="w-full h-[400px] object-cover rounded-xl shadow-md"
                    />
                    <h1 className="text-4xl font-bold text-gray-900">{post.titulo}</h1>
                    <p className="text-sm text-gray-500">por {post.autor} · {post.data}</p>
                    <p className="text-lg text-gray-700 leading-relaxed">{post.conteudo}</p>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Deixe um comentário</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setModalConfig({ title: 'Sucesso!', message: 'Comentário enviado!' });
                                setModalOpen(true);
                            }}
                            className="space-y-4"
                        >
                            <textarea
                                rows={4}
                                placeholder="Escreva seu comentário aqui..."
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                            >
                                Enviar comentário
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <SidebarMiniaturas posts={outros} />
                </div>
            </section>

            <SuccessModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalConfig.title}
                message={modalConfig.message}
            />
        </>
    );
}
