export default function NavBar(){
    return (<>
    

    <header className="flex items-center justify-between px-24 py-6 max-w-full mx-auto">
        <div className="flex items-center space-x-1">
            <button type="button" 
                className="flex items-center space-x-2 text-6xl font-extrabold select-none text-gray-500 transition duration-300 hover:scale-105">
                <span className="text-gray-500">Lab</span>
                <span className="text-green-700">Invest</span>
            </button>
        </div>

        <nav  className="flex space-x-16 text-base font-semibold text-gray-600">
            <a className="hover:text-gray-900 hover:scale-105 transition duration-300 hover:text-green-700"
                href="../sobreNos/sobreIndex.html">
                Sobre nós
            </a>
            <a className="hover:text-gray-900 hover:scale-105 transition duration-300 hover:text-green-700"
                href="../telaInicial/telainicial.html#services">
                Serviços
            </a>
            <a className="hover:text-gray-900 hover:scale-105 transition duration-300 hover:text-green-700"
                href="../perfil2/perfil-2.html">
                Meu Perfil
            </a>
        </nav>
        <div className="relative flex items-center bg-green-700 rounded-full px-4 py-1.5 text-white cursor-pointer">

           
            <div className="relative z-50">
                <button id="profileButton" aria-label="User profile"
                    className="text-gray-200 hover:text-green-800 transition focus:outline-none">
                    <i className="fas fa-user text-lg"></i>
                </button>

                <div id="profileDropdown"
                    className="hidden absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-48 mt-2 z-[9999] transition-opacity duration-300 opacity-0">
                    <a href="index.html" className="block px-4 py-2 text-green-700 hover:bg-gray-100 rounded">Entrar</a>
                </div>
            </div>
        </div>
    </header>

    
    
    </>)
}