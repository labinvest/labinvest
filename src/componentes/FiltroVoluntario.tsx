'use client';

type Props = {
  opcoes: string[];
  categoriaAtiva: string;
  onCategoriaChange: (categoria: string) => void;
};

function FiltrosVoluntario({ opcoes, categoriaAtiva, onCategoriaChange }: Props) {
  return (
    <aside className="w-full md:w-64 p-6 bg-white rounded-xl shadow-lg h-fit">
      <h4 className="text-xl font-bold text-gray-900 mb-5">
        Categorias
      </h4>
      <nav className="flex flex-col space-y-3" aria-label="Filtros de categoria">
        <button
          onClick={() => onCategoriaChange('todas')}
          aria-label="Filtrar por todas as categorias"
          aria-pressed={categoriaAtiva === 'todas'}
          className={`
            text-left text-lg transition-colors
            ${
              categoriaAtiva === 'todas'
                ? 'font-bold text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          Todas
        </button>

        {opcoes.map((opcao) => (
          <button
            key={opcao}
            onClick={() => onCategoriaChange(opcao)}
            aria-label={`Filtrar por categoria ${opcao}`}
            aria-pressed={categoriaAtiva === opcao}
            className={`
              text-left text-lg transition-colors
              ${
                categoriaAtiva === opcao
                  ? 'font-bold text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {opcao}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default FiltrosVoluntario;
