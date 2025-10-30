import React from 'react';
import VoluntarioSidebar from '@/componentes/VoluntarioSidebar';

function ServicoPage() {
  return (
    <div className="max-w-7xl mx-auto p-5 md:p-8">
      
      <div className="flex flex-col md:flex-row gap-10">

        <main className="flex-1">

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Consultoria para Controle de Finanças
            </h2>
            <p className="text-gray-700 leading-relaxed">
              A consultoria para controle de finanças é um serviço especializado que
              auxilia indivíduos e empresas a <strong className="font-bold text-gray-900"> administrarem seus recursos financeiros</strong>
              de forma eficaz. O objetivo principal é evitar desperdícios, aumentar a
              rentabilidade e ajudar a saúde financeira no curto, médio e longo prazo.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Benefícios da Consultoria Financeira
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>
                <strong className="font-bold text-gray-900">Gestão eficiente do orçamento</strong> - Organizar receitas e despesas.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Redução de gastos desnecessários</strong> - Cortar custos sem comprometer qualidade.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Planejamento para investimentos</strong> - Aplicações inteligentes e rentáveis.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Prevenção de endividamento</strong> - Controle sobre dívidas e pagamentos.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Segurança financeira</strong> - Criação de reservas para emergências futuras.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Consultoria Pessoal vs. Empresarial
            </h2>
            <p className="text-gray-700 leading-relaxed">
              A <strong className="font-bold text-gray-900">consultoria financeira pessoal</strong> ajuda indivíduos e famílias a gerenciar
              salários, investimentos, aposentadoria e redução de dívidas. Já a
              <strong className="font-bold text-gray-900"> consultoria empresarial</strong> foca na saúde financeira de empresas, melhorando fluxo de
              caixa, investimentos e maximização de lucros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Passos para um Controle Financeiro Eficiente
            </h2>

            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li>
                <strong className="font-bold text-gray-900">Analisar receitas e despesas</strong> constantemente.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Definir metas financeiras</strong> realistas.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Reduzir gastos desnecessários</strong> sem impactar qualidade de vida.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Investir estrategicamente</strong>, considerando riscos e rentabilidade.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Buscar suporte profissional</strong> para decisões seguras e eficazes.
              </li>
            </ol>
          </section>
        </main>

        <aside className="w-full md:w-80 lg:w-96 flex-shrink-0">
          <VoluntarioSidebar/>
        </aside>
      </div>
    </div>
  );
}

export default ServicoPage;