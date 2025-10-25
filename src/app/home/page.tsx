"use client";
import { Banner } from "@/componentes/Banner";
import Card from "@/componentes/Card";
import { ImgRedondaTelaInicial } from "@/componentes/CardRedondo";
import { Carousel } from "@/componentes/Carousel";
import { faUserTie, faChartLine, faHandshake } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="flex justify-center items-center mt-32 mb-12 gap-2">
        <h2 className="text-3xl font-extrabold text-green-800">
          Feedback de
        </h2>
        <h2 className="text-3xl font-extrabold text-white">
          {" "}
          alguns clientes
        </h2>
      </div>
      <Carousel />

      <div className="flex justify-center items-center mt-32 mb-12 gap-2">
        <h2 className="text-3xl font-extrabold text-green-800">
          Por que escolher
        </h2>
        <h2 className="text-3xl font-extrabold text-white">
          {" "}
          nossos serviços?
        </h2>
      </div>
      <div className="max-w-full m-20">
        <div className="flex justify-center gap-8 flex-wrap mb-18">
          <Card
            Title="Atendimento Personalizado"
            Paragraph="Soluções feitas sob medida para o que você realmente precisa."
            Icon={faUserTie}
          />
          <Card
            Title="Resultados Reais"
            Paragraph="Soluções feitas sob medida para o que você realmente precisa."
            Icon={faChartLine}
          />
          <Card
            Title="Confiança e Acessibilidade"
            Paragraph="Soluções feitas sob medida para o que você realmente precisa."
            Icon={faHandshake}
          />
        </div>
      </div>

      <div className="flex justify-center items-center mt-24 mb-12 gap-2">
        <h2 className="text-3xl font-extrabold text-green-800">Nossos</h2>
        <h2 className="text-3xl font-extrabold text-white">serviços</h2>
      </div>
      <ImgRedondaTelaInicial />
    </>
  );
}
