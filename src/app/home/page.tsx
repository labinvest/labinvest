"use client";
import { Banner } from "@/componentes/Banner";
import Card from "@/componentes/Card";
import { ImgRedondaTelaInicial } from "@/componentes/CardRedondo";
import { Carousel } from "@/componentes/Carousel";
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
      <Banner />
      <div className="flex justify-center items-center mt-16 mb-12 gap-2">
        <h2 className="text-3xl font-extrabold text-grey-800">
          Feedback de alguns
        </h2>
        <h2 className="text-3xl font-extrabold text-green-700">clientes:</h2>
      </div>
      <Carousel />
      <div className="flex justify-center items-center mt-16 mb-12 gap-2">
        <h2 className="text-3xl font-extrabold text-grey-800">
          Por que escolher
        </h2>
        <h2 className="text-3xl font-extrabold text-green-700">
          nossos serviços?
        </h2>
      </div>
      <div className="max-w-full mx-20 mb-16">
        <div className="flex justify-center gap-8 flex-wrap">
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
      </div>
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-12 gap-2">
            <h2 className="text-3xl font-extrabold text-gray-800">Como</h2>
            <h2 className="text-3xl font-extrabold text-green-700">
              funciona?
            </h2>
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
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4 gap-2">
              <h2 className="text-3xl font-extrabold text-gray-800">Acessos</h2>
              <h2 className="text-3xl font-extrabold text-green-700">
                rápidos:
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Navegue facilmente pelos nossos serviços. Escolha a opção que
              melhor atende suas necessidades.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <ImgRedondaTelaInicial />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-1/3">
            <VoluntarioSidebar />
          </aside>

          <div className="lg:w-2/3">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
              Por que contar com{" "}
              <span className="text-green-700">especialistas?</span>
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-700 text-2xl mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Experiência Comprovada
                  </h3>
                  <p className="text-gray-600">
                    Anos de mercado ajudando pessoas a alcançarem estabilidade
                    financeira.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FontAwesomeIcon
                  icon={faLightbulb}
                  className="text-green-700 text-2xl mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Ajuda Personalizada
                  </h3>
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
                  <h3 className="font-bold text-gray-800 mb-2">
                    Suporte Contínuo
                  </h3>
                  <p className="text-gray-600">
                    Acompanhamento regular para garantir que você esteja no
                    caminho certo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">
            Pronto para repaginar seus gastos?
          </h2>
          <p className="text-xl mb-8">
            Agende sua primeira consulta hoje mesmo!
          </p>
          <button onClick={() => router.push("/agendamento")} className="bg-green-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
            Agendar Consulta!
          </button>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex justify-center items-center mb-12 gap-2">
          <h2 className="text-3xl font-extrabold text-gray-800">Perguntas</h2>
          <h2 className="text-3xl font-extrabold text-green-700">frequentes</h2>
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
    </>
  );
}
