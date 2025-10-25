'use client';
import { Banner } from "@/componentes/Banner";
import Card from "@/componentes/Card";
import { ImgRedondaTelaInicial } from "@/componentes/CardRedondo";
import { Carousel } from "@/componentes/Carousel";

import { faUserTie, faChartLine, faHandshake } from "@fortawesome/free-solid-svg-icons";

export default function Home(){
    return (<>
    
     <div className="max-w-full mx-auto px-28">
              <div className="flex justify-center gap-8">
                <Card Title="Atendimento Personalizado" Paragraph="Soluções feitas sob medida para o que você realmente precisa." Icon={faUserTie} />
                <Card Title="Resultados Reais" Paragraph="Soluções feitas sob medida para o que você realmente precisa." Icon={faChartLine} />
                <Card Title="Confiança e Acessibilidade" Paragraph="Soluções feitas sob medida para o que você realmente precisa." Icon={faHandshake} />
              </div>
            </div>
            <Carousel />
            <Banner />

            <ImgRedondaTelaInicial />
    </>)
}
