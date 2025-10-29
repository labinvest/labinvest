import { Carousel } from "@/componentes/Carousel";

export default function PerfilVoluntario() {
  return (
    <div className="flex flex-col items-center w-full bg-gray-50 min-h-screen py-6">

      <div className="w-full max-w-5xl space-y-8 mx-auto px-4">

        
        <div className=" shadow-xl p-6 bg-white rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center shadow-inner">
              <i className="fas fa-user-circle text-green-700 text-6xl"></i>
            </div>

            <div className="flex flex-col text-left">
              <h2 className="font-bold text-gray-800 text-2xl">
                Fulano de Tal
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Consultor Financeiro Pessoal e Empresarial
              </p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed max-w-md">
                Mais de 7 anos ajudando pessoas físicas e pequenos negócios a organizarem suas finanças, 
                saírem do endividamento e começarem a investir com segurança.
              </p>
            </div>
          </div>

          <button
            className="bg-green-700 text-white text-sm font-semibold rounded-full px-6 py-2 hover:bg-green-800 transition w-fit self-start sm:self-auto"
          >
            Mensagem
          </button>
          <button
            className="bg-green-700 text-white text-sm font-semibold rounded-full px-6 py-2 hover:bg-green-800 transition w-fit self-start sm:self-auto"
          >
            Solicitar Agendamento
          </button>
        </div>

       
        <div className="rounded-2xl p-8 bg-white shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Áreas de Atuação
          </h1>

          <div className="flex flex-col md:flex-row justify-center gap-6 items-stretch">

            
            <div className="flex-1 flex flex-col border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Especialista Financeiro
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Planejamento e orçamento pessoal/empresarial</li>
                <li>Gestão de fluxo de caixa e controle de despesas</li>
                <li>Análise de investimentos e avaliação de risco</li>
                <li>Reestruturação de dívidas e educação financeira</li>
              </ul>
            </div>

            
            <div className="flex-1 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Analista Contábil
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Responsável por elaborar demonstrativos financeiros, reconciliar contas e assegurar conformidade fiscal.
                Atua no controle de lançamentos contábeis, análise de balanços e suporte às decisões gerenciais.
              </p>
            </div>

          </div>
        </div>

        
        <div className="m-4">
          <Carousel />
        </div>

      </div>
    </div>
  );
}
