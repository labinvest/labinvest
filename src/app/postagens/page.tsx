"use client";
import SidebarMiniaturas from "@/componentes/SideBarNoticias";
import Link from "next/link";


const postagens = [
  {
    id: 1,
    autor: "Carlos Lima",
    data: "28 de Outubro de 2025",
    conteudo:
      "Participei da ação no bairro Jardim Europa. A receptividade das pessoas foi maravilhosa.",
    imagem: "/images/Image6.png",
    destaque: true,
    categoria: "Ação Comunitária",
  },
  {
    id: 2,
    autor: "Juliana Ribeiro",
    data: "25 de Outubro de 2025",
    conteudo:
      "Organizamos uma roda de conversa sobre educação financeira para jovens. Foi um sucesso!",
    imagem: "/images/post3.jpg",
    destaque: false,
    categoria: "Educação Financeira",
  },
  {
    id: 3,
    autor: "Marcos Silva",
    data: "22 de Outubro de 2025",
    conteudo:
      "Distribuímos kits de higiene e conversamos com moradores sobre planejamento financeiro.",
    imagem: "/images/post4.jpg",
    destaque: false,
    categoria: "Saúde e Bem-estar",
  },
  {
    id: 4,
    autor: "Ana Souza",
    data: "20 de Outubro de 2025",
    conteudo:
      "Ajudamos famílias com orientações sobre orçamento doméstico e planejamento de gastos.",
    imagem: "/images/post5.jpg",
    destaque: false,
    categoria: "Educação Financeira",
  },
];

export default function PostagensVoluntarios() {
  const destaque = postagens.find((p) => p.destaque);
  const outros = postagens.filter((p) => !p.destaque);
  const antigos = postagens.slice(1);

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
                <img src={destaque.imagem} alt={`Imagem de ${destaque.autor}`} className="w-full h-[500px] object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-white text-3xl font-bold mb-2">{destaque.autor}</h3>
                  <p className="text-white text-sm mb-1">{destaque.data}</p>
                  <p className="text-white text-lg leading-relaxed">{destaque.conteudo}</p>
                </div>
              </article>
            </Link>

          )}


          {outros.map((post) => (
            <Link key={post.id} href={`/postagens/${post.id}`}>
              <article className="flex flex-col md:flex-row gap-6 items-center bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 cursor-pointer">
                <img src={post.imagem} alt={`Imagem de ${post.autor}`} className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
                <div className="md:w-2/3 space-y-2 text-left">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{post.categoria}</span>
                  <h4 className="text-xl font-semibold text-gray-900">{post.autor}</h4>
                  <p className="text-sm text-gray-500">{post.data}</p>
                  <p className="text-gray-700 text-base leading-relaxed">{post.conteudo}</p>
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
