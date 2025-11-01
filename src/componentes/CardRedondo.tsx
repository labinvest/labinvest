import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export function ImgRedondaTelaInicial() {
  const router = useRouter();

  const items = [
    {
      label: "Nossos Serviços",
      image: "/images/papel.png",
      route: "/servicos",
    },
    {
      label: "Nossos Voluntários",
      image: "/images/moeda.png",
      route: "/voluntarios",
    },
    {
      label: "Nossas Notícias",
      image: "/images/calculadora.png",
      route: "/noticias",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="flex flex-wrap justify-center gap-8">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.route)}
            className="bg-white p-6 w-[280px] h-[340px] rounded-xl transition flex flex-col items-center focus:outline-none"
          >
            <Image
              src={item.image}
              alt={item.label}
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover mb-4 transition-transform duration-300 hover:scale-105"
            />
            <p className="text-green-700 font-bold text-center text-lg">
              {item.label}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
