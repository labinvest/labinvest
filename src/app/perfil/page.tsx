"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faBriefcase,
  faBullseye,
  faLightbulb,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

export default function Perfil() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-32 h-32 bg-green-700 rounded-full flex items-center justify-center text-white text-5xl shadow-xl">
              <img src="/images/easter.jpg" alt="Nome Icon" className="w-40 h-40" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Cliente do Fulano de Tal
              </h1>
              <p className="text-gray-600 mb-4">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-green-700" />
                Microempreendedora (salão de beleza)
              </p>
              <p className="text-gray-700 max-w-3xl">
                Trabalho o mês todo, mas o dinheiro sempre sumia — e eu nem sabia pra onde. 
                Gosto de curtir um som, sair no fim de semana, pedir um lanche assistindo série... 
                mas também quero ter paz no fim do mês.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações de Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faUser} className="text-green-700 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nome</p>
                <p className="font-semibold text-gray-800">Admin</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-700 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-800">admin@labinvest.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faPhone} className="text-green-700 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-semibold text-gray-800">(11) 11111-1111</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faBriefcase} className="text-green-700 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Profissão</p>
                <p className="font-semibold text-gray-800">Microempreendedora</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faBullseye} className="text-green-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-green-700">Objetivos</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-700 mt-1">•</span>
                <span className="text-gray-700">Organizar os gastos mensais</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-700 mt-1">•</span>
                <span className="text-gray-700">Quitar dívidas pequenas e equilibrar o fluxo de caixa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-700 mt-1">•</span>
                <span className="text-gray-700">Aprender a controlar as finanças do negócio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-700 mt-1">•</span>
                <span className="text-gray-700">Criar uma reserva de emergência</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-700 mt-1">•</span>
                <span className="text-gray-700">Começar a investir com segurança</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faLightbulb} className="text-blue-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-blue-700">Motivações</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-blue-700 mt-1">•</span>
                <span className="text-gray-700">Ter mais tranquilidade e segurança</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 mt-1">•</span>
                <span className="text-gray-700">Parar de depender do limite do banco</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 mt-1">•</span>
                <span className="text-gray-700">Fazer o dinheiro render melhor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 mt-1">•</span>
                <span className="text-gray-700">Crescer o negócio de forma mais planejada</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-red-700">Desafios</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-red-700 mt-1">•</span>
                <span className="text-gray-700">Falta de tempo e rotina corrida</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-700 mt-1">•</span>
                <span className="text-gray-700">Medo de termos técnicos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-700 mt-1">•</span>
                <span className="text-gray-700">Dificuldade em manter constância no controle financeiro</span>
              </li>
            </ul>
          </div>
        </div>
    </div>
</div>
  );
}