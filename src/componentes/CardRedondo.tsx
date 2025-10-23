import Image from "next/image";
export function ImgRedondaTelaInicial() {
  return (
    <section className="gap-12 max-w-full mx-auto px-28">
      <div className="flex justify-center gap-8">
        <div className="text-white p-6 h-[350px] w-[300px] flex flex-col justify-start items-center">
          <button className="focus:outline-none flex flex-col items-center">
            <Image
              src="/images/papel.png"
              alt="Imagem Redonda"
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
            />
          </button>
          <p className="text-green-700 font-bold text-center mt-4 px-4 py-2 rounded-md">
            Renegociação e Organização de Dívidas.
          </p>
        </div>
        <div className="text-white p-6 h-[350px] w-[300px] flex flex-col justify-start items-center">
          <button className="focus:outline-none flex flex-col items-center">
            <Image
              src="/images/moeda.png"
              alt="Imagem Redonda"
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
            />
            <p className="bg-white text-green-700 font-bold text-center mt-4 px-4 py-2 rounded-md">
              Planejamento para Investimentos Iniciais.
            </p>
          </button>
        </div>
        <div className="text-white p-6 h-[350px] w-[300px] flex flex-col justify-start items-center">
          <button className="focus:outline-none">
              <Image
              src="/images/calculadora.png"
              alt="Imagem Redonda"
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
            />
          </button>
          <p className="text-green-700 font-bold text-center mt-6">
            Renegociação e Organização de Dívidas.
          </p>
        </div>
      </div>
    </section>
  );
}
