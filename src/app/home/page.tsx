"use client";
import { TestimonialCarousel } from "@/componentes/Carousel";
import { Banner } from "@/componentes/Banner";
import Card from "@/componentes/Card";
import VoluntarioSidebar from "@/componentes/VoluntarioSidebar";
import {
  faUserTie,
  faChartLine,
  faHandshake,
  faCheckCircle,
  faLightbulb,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-1 shadow 2xl">
        <Banner />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-1">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight px-4">
              Feedback de alguns <span className="text-green-700">clientes</span>
            </h2>
            <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              Veja o que nossos clientes dizem sobre a experiência com a Lab Invest.
            </p>
          </div>
          <TestimonialCarousel />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">

          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight px-4">
              Por que escolher <span className="text-green-700">nossos serviços?</span>
            </h2>
            <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              Descubra os diferenciais que fazem da Lab Invest a parceira ideal para sua jornada financeira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
            <Card
              Title="Atendimento Personalizado"
              Paragraph="Soluções feitas sob medida para o que você realmente precisa."
              Icon={faUserTie}
            />
            <Card
              Title="Resultados Reais"
              Paragraph="Estratégias comprovadas que geram resultados tangíveis."
              Icon={faChartLine}
            />
            <Card
              Title="Confiança e Acessibilidade"
              Paragraph="Transparência e facilidade de acesso em todos os processos."
              Icon={faHandshake}
            />
          </div>
        </section>

        <section className="bg-gradient-to-t from-green-50 to-white py-8 sm:py-16 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight px-4">
                Como <span className="text-green-700">funciona?</span>
              </h2>
              <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
                Entenda o passo a passo para transformar sua vida financeira com a Lab Invest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Agende uma Consulta
                </h3>
                <p className="text-gray-600">
                  Entre em contato e agende um horário que funcione para você.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Análise Personalizada
                </h3>
                <p className="text-gray-600">
                  Nossos especialistas analisam sua situação financeira atual.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Plano de Ação
                </h3>
                <p className="text-gray-600">
                  Receba um plano detalhado e comece sua jornada financeira.
                </p>
              </div>
            </div>
          </div>
        </section >

        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <div className="px-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
                Por que contar com <span className="text-green-700">especialistas?</span>
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-700 text-2xl mt-1 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Experiência Comprovada</h3>
                    <p className="text-gray-600">
                      Anos de mercado ajudando pessoas a alcançarem estabilidade financeira.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="text-green-700 text-2xl mt-1 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Ajuda Personalizada</h3>
                    <p className="text-gray-600">
                      Estratégias adaptadas às suas necessidades específicas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-green-700 text-2xl mt-1 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Suporte Contínuo</h3>
                    <p className="text-gray-600">
                      Acompanhamento regular para garantir que você esteja no caminho certo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <VoluntarioSidebar />
            </div>

          </div>
        </section>

        <section className="text-black py-16 px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-4">
              Pronto para fazer parte dessa <span className="text-green-700">transformação?</span>
            </h2>
            <p className="text-xl mb-8">
              Junte-se a centenas de pessoas que já mudaram sua relação com o dinheiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/voluntario/cadastro")}
                className="bg-green-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-800 hover:text-white transition duration-300 cursor-pointer"
              >
                Seja um Voluntário
              </button>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
          <div className="flex justify-center items-center mb-8 sm:mb-12 gap-2 flex-wrap px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Perguntas</h2>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-green-700">frequentes</h2>
          </div>

          <div className="space-y-6">
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-bold text-gray-800 cursor-pointer">
                Como funciona a consultoria?
              </summary>
              <p className="text-gray-600 mt-4">
                A consultoria começa com uma avaliação detalhada da sua situação
                financeira, seguida pela elaboração de um plano personalizado.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-bold text-gray-800 cursor-pointer">
                Como a ajuda funciona?
              </summary>
              <p className="text-gray-600 mt-4">
                Nosso processo é colaborativo. Trabalhamos juntos para identificar
                suas necessidades e desenvolver um plano de ação.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-bold text-gray-800 cursor-pointer">
                As consultas são presenciais ou online?
              </summary>
              <p className="text-gray-600 mt-4">Oferecemos somente online.</p>
            </details>
          </div>
        </section>
      </section >
    </>
  );
}
