"use client";
import React from "react";
import Image from "next/image";

const postagens = [
  {
    autor: "Ana Souza",
    data: "30 de Outubro de 2025",
    conteudo:
      "Hoje tivemos uma experiência incrível ajudando famílias com orientações sobre orçamento doméstico.",
    imagem: "/images/post1.jpg",
    destaque: true,
  },
  {
    autor: "Carlos Lima",
    data: "28 de Outubro de 2025",
    conteudo:
      "Participei da ação no bairro Jardim Europa. A receptividade das pessoas foi maravilhosa.",
    imagem: "/images/post2.jpg",
    destaque: false,
  },
  {
    autor: "Juliana Ribeiro",
    data: "25 de Outubro de 2025",
    conteudo:
      "Organizamos uma roda de conversa sobre educação financeira para jovens. Foi um sucesso!",
    imagem: "/images/post3.jpg",
    destaque: false,
  },
  {
    autor: "Marcos Silva",
    data: "22 de Outubro de 2025",
    conteudo:
      "Distribuímos kits de higiene e conversamos com moradores sobre planejamento financeiro.",
    imagem: "/images/post4.jpg",
    destaque: false,
  },
];

export default function CarouselNoticias() {
  const destaque = postagens.find((p) => p.destaque);
  const outros = postagens.filter((p) => !p.destaque);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {destaque && (
        <div className="mb-16">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <Image
              src={destaque.imagem}
              alt={`Imagem de ${destaque.autor}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-black text-2xl font-bold mb-2">{destaque.autor}</h3>
              <p className="text-black text-sm mb-1">{destaque.data}</p>
              <p className="text-black text-lg">{destaque.conteudo}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {outros.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="relative w-full h-64">
              <Image
                src={post.imagem}
                alt={`Imagem de ${post.autor}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{post.autor}</h3>
              <p className="text-sm text-gray-500 mb-2">{post.data}</p>
              <p className="text-gray-700 text-sm">{post.conteudo}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
