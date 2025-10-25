export  function Banner() {
  return (
    <>
      <section className="max-w-full mx-auto px-24 mt-10">
  <div className="flex items-center justify-between max-w-[1200px] mx-auto my-28 gap-10">
    {/* Texto à esquerda */}
    <div className="flex-1 bg-gradient-to-r from-green-900/70 via-green-900/40 to-transparent rounded-xl p-16">
      <h2 className="text-4xl font-extrabold text-gray-300 mb-6 leading-tight">
        Nós <span className="font-extrabold">ajudamos</span> sua economia!
      </h2>
      <p className="text-gray-200 text-lg mb-8 leading-relaxed">
        Com a Lab Invest, você sai do vermelho e garantimos a melhor ajuda para administrar sua renda.
      </p>
    </div>

    {/* Banner à direita */}
    <div className="flex-1">
      <img
        alt="Banner"
        className="w-full object-cover rounded-xl max-h-[300px]"
        src="https://github.com/HenriqueVidotto/LabInvestSite/blob/main/telaInicial/assets/banner.png?raw=true"
        width={1200}
      />
    </div>
  </div>
  </section>

 '<section className="max-w-screen-xl mx-auto px-4 mt-10 mb-28">
  <div className="flex flex-col lg:flex-row items-center gap-12">
    {/* Imagem com largura controlada */}
    <div className="w-full lg:w-[900px] flex justify-center">
      <img
        alt="Investimento"
        className="rounded-xl w-full h-auto object-cover"
        src="https://github.com/HenriqueVidotto/LabInvestSite/blob/main/telaInicial/assets/img%20inicio.png?raw=true"
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
