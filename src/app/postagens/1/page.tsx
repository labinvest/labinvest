"use client";
import React from "react";
import { useParams } from "next/navigation";
import SidebarMiniaturas from "@/componentes/SideBarNoticias";

const postagens = [
    {
        id: 1,
        autor: "Carlos Lima",
        data: "28 de Outubro de 2025",
        conteudo:
            "Participei da ação no bairro Jardim Europa. A receptividade das pessoas foi maravilhosa. Conversamos com moradores sobre educação financeira e distribuímos materiais informativos. Foi uma experiência transformadora.",
        imagem: "/images/Image6.png",
        categoria: "Ação Comunitária",
    },
    {
        id: 2,
        autor: "Juliana Ribeiro",
        data: "25 de Outubro de 2025",
        conteudo:
            "Organizamos uma roda de conversa sobre educação financeira para jovens. Foi um sucesso! Os participantes trouxeram dúvidas e compartilharam histórias inspiradoras.",
        imagem: "/images/post3.jpg",
        categoria: "Educação Financeira",
    },
    {
        id: 3,
        autor: "Marcos Silva",
        data: "22 de Outubro de 2025",
        conteudo:
            "Distribuímos kits de higiene e conversamos com moradores sobre planejamento financeiro. A ação foi realizada em parceria com comerciantes locais.",
        imagem: "/images/post4.jpg",
        categoria: "Saúde e Bem-estar",
    },
    {
        id: 4,
        autor: "Ana Souza",
        data: "20 de Outubro de 2025",
        conteudo:
            "Ajudamos famílias com orientações sobre orçamento doméstico e planejamento de gastos. A atividade contou com apoio de especialistas voluntários.",
        imagem: "/images/post5.jpg",
        categoria: "Educação Financeira",
    },
];

export default function PaginaPostagem() {
    const { id } = useParams();
    const post = postagens.find((p) => p.id === Number(id));
    const outros = postagens.filter((p) => p.id !== Number(id));

    if (!post) {
        return (
            <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
                <img
                    src="/images/Image6.png"
                    alt="Ação no Jardim Europa"
                    className="w-full h-[400px] object-cover rounded-xl shadow-md"
                />
                <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    Ação Comunitária
                </span>
                <h1 className="text-4xl font-bold text-gray-900">Carlos Lima</h1>
                <p className="text-sm text-gray-500">28 de Outubro de 2025</p>
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                    <p>
                        No último sábado, o bairro Jardim Europa foi palco de uma emocionante ação comunitária promovida por voluntários locais. A iniciativa teve como objetivo principal levar informações sobre educação financeira, saúde e cidadania para os moradores da região.
                    </p>
                    <p>
                        Durante a manhã, foram montadas tendas com atividades educativas, distribuição de kits de higiene e rodas de conversa com especialistas. Crianças participaram de oficinas lúdicas sobre economia doméstica, enquanto adultos puderam tirar dúvidas sobre orçamento familiar e planejamento de dívidas.
                    </p>
                    <p>
                        Carlos Lima, um dos voluntários, destacou a receptividade da comunidade: “Foi incrível ver como as pessoas estavam abertas para aprender e compartilhar suas experiências. A troca foi muito rica.”
                    </p>
                    <p>
                        Além das atividades práticas, a ação contou com apoio de comerciantes locais, que doaram materiais e alimentos para os participantes. Ao final do dia, todos saíram com mais conhecimento, esperança e vontade de continuar transformando a realidade ao seu redor.
                    </p>
                    <p>
                        Essa foi apenas uma das muitas ações previstas para os próximos meses. A equipe de voluntários segue mobilizada e já planeja novas edições em outros bairros da cidade.
                    </p>
                </div>
                <div className="mt-12 space-y-8">
                    <div className="flex items-center justify-between">
                        <button
                            className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 font-medium"
                            onClick={() => alert("Você curtiu esta postagem!")}
                        >
                            Curtir
                        </button>
                        <p className="text-sm text-gray-500">84 visualizações</p>
                    </div>

                    <div className="space-y-4 mt-8">
                        <h3 className="text-lg font-semibold text-gray-800">Deixe um comentário</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Comentário enviado!");
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
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3 space-y-8">
                <img
                    src={post.imagem}
                    alt={`Imagem de ${post.autor}`}
                    className="w-full h-[400px] object-cover rounded-xl shadow-md"
                />
                <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    {post.categoria}
                </span>
                <h1 className="text-4xl font-bold text-gray-900">{post.autor}</h1>
                <p className="text-sm text-gray-500">{post.data}</p>
                <p className="text-lg text-gray-700 leading-relaxed">{post.conteudo}</p>
            </div>

            <div className="lg:col-span-1">
                <SidebarMiniaturas posts={outros} />
            </div>

        </section>
    );
}
