export function Banner() {
  return (
    <>
      <section className="max-w-full mx-auto mt-auto px-4 mb-auto">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto  gap-10">
          {/* Texto à esquerda */}
          <div className="flex-1  p-">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
              Nós <span className="font-extrabold">ajudamos sua </span>
              <span className="font-extrabold  text-green-700">economia!  </span>
            </h2>
            <p className="text-gray-600 font-semibold mt-6 text-lg">
              Com a Lab Invest, você sai do vermelho e garantimos a melhor ajuda para administrar sua renda.
            </p>
          </div>

          {/* Banner à direita */}
          <img
            alt="Banner"
            className="object-cover rounded-xl max-h-[400px] w-[400px] lg:w-[700px]"
            src="images/banner.png"
            width={1200}
          />

        </div>
      </section>

      '<section className="max-w-screen-xl mx-auto px-4 mt-10 mb-28">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Imagem com largura controlada */}
          <div className="w-full lg:w-[700px] flex justify-center ">
            <img
              alt="Investimento"
              className="rounded-xl w-full h-auto object-cover"
              src="images/invest_lamp.png"
            />
          </div>

          {/* Texto */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-800 leading-tight">
              Um novo jeito de administrar suas{" "}
              <span className="text-green-700 font-extrabold">dívidas</span>
            </h3>
            <p className="text-gray-600 font-semibold mt-6 text-lg">
              Centenas de colaboradores prontos para te ajudar 24hrs por dia.
            </p>
          </div>
        </div>
      </section>
      '
    </>
  )
}
