export  function Banner() {
  return (
    <>
      <section className="max-w-full mx-auto px-24 mt-10">
        <div className="relative rounded-xl overflow-hidden max-w-[1900px] mx-auto">
          <img
            alt="Banner"
            className="w-full object-cover rounded-xl max-h-[300px]"
            src="https://github.com/HenriqueVidotto/LabInvestSite/blob/main/telaInicial/assets/banner.png?raw=true"
            width={1900}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-900/40 to-transparent rounded-xl p-16 flex flex-col justify-center max-w-lg">
            <h2 className="text-4xl font-extrabold text-gray-300 mb-6 leading-tight">
              Nós <span className="font-extrabold">ajudamos</span> sua economia!
            </h2>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              Com a Lab Invest, você sai do vermelho e garantimos a melhor ajuda para administrar sua renda.
            </p>
          </div>
        </div>
        <div className="flex justify-center -mt-8">
          <i className="fas fa-arrow-down text-green-900 text-3xl"></i>
        </div>
      </section>

      <section className="max-w-full mx-auto px-24 mt-24 flex items-center max-w-[1200px] space-x-24">
        <div className="flex-1">
          <img
            alt="Investimento"
            className="rounded-xl w-full h-auto object-cover"
            height={400}
            src="https://github.com/HenriqueVidotto/LabInvestSite/blob/main/telaInicial/assets/img%20inicio.png?raw=true"
            width={600}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-4xl font-extrabold text-gray-800 leading-tight">
            Um novo jeito de administrar suas{" "}
            <span className="text-green-700 font-extrabold">dívidas</span>
          </h3>
          <p className="text-gray-600 font-semibold mt-6 text-lg">
            Centenas de colaboradores prontos para te ajudar 24hrs por dia.
          </p>
        </div>
      </section>
    </>
  );
}
