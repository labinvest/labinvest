export function Banner() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 leading-tight tracking-tight">
              Nós <span className="font-extrabold">impulsionamos sua</span>{" "}
              <span className="text-green-700 font-extrabold">economia</span>
            </h2>
            <p className="text-gray-600 font-medium text-lg leading-relaxed">
              Com a Lab Invest, você elimina suas dívidas e recebe o suporte ideal para organizar sua renda com segurança e eficiência.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/images/banner.png"
              alt="Ilustração de economia pessoal com Lab Invest"
              className="object-cover rounded-xl w-full max-w-[600px] h-auto shadow-md"
            />
          </div>
        </div>
      </section>
    </>
  )
}
