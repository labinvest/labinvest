"use client";
import React from "react";
import CarouselNoticias from "@/componentes/CarouselNoticias";

const postagens = [
  {
    autor: "Carlos Lima",
    data: "28 de Outubro de 2025",
    conteudo:
      "Participei da ação no bairro Jardim Europa. A receptividade das pessoas foi maravilhosa.",
    imagem: "/images/Image6.png",
    destaque: true,
  },
];

export default function PostagensVoluntarios() {
  const destaque = postagens.find((p) => p.destaque);
  const outros = postagens.filter((p) => !p.destaque);

  return (
    <section className="max-w-7xl mx-auto px-6 py-1">
      
      {destaque && (
        <div className="mb-16">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={destaque.imagem}
              alt="Post em destaque"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-white text-3xl font-bold mb-2">{destaque.autor}</h3>
              <p className="text-white text-2xl mb-1">{destaque.data}</p>
              <p className="text-white text-lg">{destaque.conteudo}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-1">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Postagens dos <span className="text-green-700">voluntários</span>
        </h2>
        <p className="text-gray-600">
          Veja os relatos e experiências compartilhadas por quem faz a diferença.
        </p>
      </div>  

      <div className="mb-1">
        <CarouselNoticias />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {outros.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={post.imagem}
              alt={`Post de ${post.autor}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-800">{post.autor}</h4>
              <p className="text-sm text-gray-500 mb-2">{post.data}</p>
              <p className="text-gray-700 text-sm">{post.conteudo}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
