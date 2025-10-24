export default function PerfilVoluntario() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* CONTAINER PRINCIPAL - controla a largura */}
      <div className="w-full max-w-4xl space-y-6">
        
        {/* CARD DO PERFIL */}
        <div className="border p-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl flex items-center justify-between px-4 sm:px-8 md:px-12">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center">
              <i className="fas fa-user-circle text-green-700 text-[5.5rem] sm:text-[6.5rem]"></i>
            </div>
            <div>
              <h2 className="font-bold text-gray-700 text-lg sm:text-xl md:text-2xl">
                Fulano de Tal
              </h2>
              <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                Consultor Financeiro Pessoal e Empresarial
              </p>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-3 max-w-xl">
                Mais de 7 anos ajudando pessoas físicas e pequenos negócios a organizarem suas finanças, 
                saírem do endividamento e começarem a investir com segurança.
              </p>
            </div>
          </div>

          <button
            className="bg-green-700 text-white text-sm sm:text-base font-semibold rounded-full px-5 py-2 hover:bg-green-800 transition"
            type="button"
          >
            Mensagem
          </button>
        </div>

        
        <div className="border rounded-xl p-4 bg-white">
          <div className="flex justify-center gap-4">
            <div className="flex flex-col border w-2/5 m-2 justify-center items-center">
              <li>Especialista</li>
              <li>Especialista</li>
              <li>Especialista</li>
              <li>Especialista</li>
            </div>
            <div className="flex border w-1/2 m-2 h-20 justify-center items-center">
              <h1>asdasd</h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
