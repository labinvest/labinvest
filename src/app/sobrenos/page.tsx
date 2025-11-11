"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHandshake, 
  faHeart, 
  faUsers, 
  faChartLine,
  faBullseye,
  faLightbulb,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

export default function SobreNos() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">Sobre Nós</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            No Lab Invest, acreditamos que boas decisões financeiras são a chave para o sucesso e estabilidade. 
            Somos uma empresa de consultoria financeira comprometida em transformar desafios econômicos em 
            oportunidades estratégicas.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Nossa <span className="text-green-700">História</span>
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Acreditamos que a educação financeira é fundamental para o empoderamento das pessoas, buscamos promover o conhecimento e a conscientização financeira para todos, incluindo jovens e adultos em situação de vulnerabilidade.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            O que nos diferencia é nosso <strong className="text-green-700">modelo colaborativo</strong>: 
            conectamos pessoas que precisam de orientação financeira com especialistas voluntários qualificados e estudantes em formação. Dessa forma, oferecemos consultoria de alta qualidade a preços acessíveis,
            criando uma rede de apoio acessível e eficiente.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 text-center">
              <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faBullseye} className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">Nossa Missão</h3>
              <p className="text-gray-700 leading-relaxed">
                Facilitar investimentos de forma simples, clara e eficiente, conectando oportunidades 
                ao seu sucesso financeiro através de consultoria acessível.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl shadow-lg p-8 text-center">
              <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faLightbulb} className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Nossa Visão</h3>
              <p className="text-gray-700 leading-relaxed">
                Ser referência em inovação financeira, proporcionando soluções intuitivas e acessíveis 
                para todos os investidores através de uma rede colaborativa.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl shadow-lg p-8 text-center">
              <div className="bg-purple-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faAward} className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Nossos Valores</h3>
              <ul className="text-gray-700 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <span className="text-purple-700">•</span>
                  Transparência e Confiança
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-700">•</span>
                  Inovação e Tecnologia
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-700">•</span>
                  Compromisso com o Cliente
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-700">•</span>
                  Excelência e Simplicidade
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Nosso <span className="text-green-700">Diferencial</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-4 rounded-full flex-shrink-0">
                <FontAwesomeIcon icon={faChartLine} className="text-green-700 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Consultoria Financeira Acessível</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reduzimos os custos tradicionais de consultoria financeira, tornando o acesso a 
                  especialistas mais democrático. Nosso modelo permite que você receba orientação 
                  profissional sem comprometer seu orçamento.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-4 rounded-full flex-shrink-0">
                <FontAwesomeIcon icon={faUsers} className="text-blue-700 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Rede de Especialistas Voluntários</h3>
                <p className="text-gray-600 leading-relaxed">
                  Conectamos você com profissionais qualificados que oferecem seus serviços de forma 
                  voluntária. Em troca, eles ganham divulgação, experiência prática e constroem seu 
                  portfólio enquanto ajudam pessoas.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-4 rounded-full flex-shrink-0">
                <FontAwesomeIcon icon={faHandshake} className="text-purple-700 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Modelo Ganha-Ganha</h3>
                <p className="text-gray-600 leading-relaxed">
                  Criamos uma comunidade onde todos se beneficiam: clientes recebem consultoria de 
                  qualidade a preços acessíveis, e especialistas constroem reputação enquanto fazem a diferença.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-4 rounded-full flex-shrink-0">
                <FontAwesomeIcon icon={faHeart} className="text-orange-700 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Impacto Social Positivo</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mais do que uma empresa, somos uma plataforma de transformação social. Acreditamos 
                  que educação financeira deve ser acessível a todos, não apenas a quem pode pagar consultorias caras.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-gradient-to-b from-green-50 to-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Como <span className="text-green-700">Funciona?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-700 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Você se cadastra</h3>
              <p className="text-gray-600">
                Crie seu perfil gratuito e conte-nos sobre suas necessidades e objetivos financeiros.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-700 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Conectamos você</h3>
              <p className="text-gray-600">
                Liberdade para poder escolher o especialista que melhor atende suas necessidades.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-700 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Transforme suas finanças</h3>
              <p className="text-gray-600">
                Receba consultoria de qualidade, acompanhamento contínuo e veja seus resultados crescerem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-black py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">
            Pronto para fazer parte dessa transformação?
          </h2>
          <p className="text-xl mb-8">
            Junte-se a centenas de pessoas que já mudaram sua relação com o dinheiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push("/agendamento")}
              className="bg-green-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer"
            >
              Agendar Consulta
            </button>
            <button 
              onClick={() => router.push("/cadastroVoluntario")}
              className="bg-green-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 hover:text-white transition duration-300 cursor-pointer"
            >
              Seja um Voluntário
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
