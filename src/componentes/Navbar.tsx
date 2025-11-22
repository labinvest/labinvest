"use client"
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [perfil, setPerfil] = useState<string | null>(null);

    useEffect(() => {
        const perfil = localStorage.getItem("perfil");
        setPerfil(perfil);
    }, []);
    useEffect(() => {
        setMenuOpen(false);
        setProfileOpen(false);
    }, [pathname]);

    if (['/'].includes(pathname)) return null;

    return (
        <header className="relative flex items-center justify-between py-4 md:py-6 px-4 md:px-8 lg:px-16 max-w-full">
            <div className="flex items-center justify-start cursor-pointer">
                <button
                    type="button"
                    onClick={() => router.push("/home")}
                    aria-label="Ir para página inicial do LabInvest"
                    className="flex space-x-2 text-2xl md:text-4xl lg:text-6xl font-extrabold select-none transition duration-300 hover:scale-105"
                >
                    <span className="text-gray-500">Lab</span>
                    <span className="text-green-700">Invest</span>
                </button>
            </div>

            <div className="md:hidden">
                <button
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((s) => !s)}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            <nav className="hidden md:flex space-x-10 text-base font-semibold text-gray-600" aria-label="Menu principal">
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/home")} aria-label="Ir para Home">Home</button>
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/servicos")} aria-label="Ir para Serviços">Serviços</button>
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/sobrenos")} aria-label="Ir para Sobre nós">Sobre nós</button>
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/voluntario")} aria-label="Ir para Voluntários">Voluntários</button>
                <button className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/postagens")} aria-label="Ir para Notícias">Notícias</button>
            </nav>

            <div className="relative items-center ml-4 hidden md:flex">
                <div className="relative">
                    <button
                        id="profileButton"
                        aria-label="Menu do perfil do usuário"
                        aria-expanded={profileOpen}
                        aria-haspopup="menu"
                        onClick={() => setProfileOpen((s) => !s)}
                        className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full p-2 shadow-lg hover:scale-105 transition focus:outline-none cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                    </button>

                    {profileOpen && ( 
                        <div id="profileDropdown" role="menu" aria-labelledby="profileButton" className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-50">
                            <button role="menuitem" onClick={() => router.push("/")} className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Entrar</button>
                            <button role="menuitem" onClick={() => router.push("/perfil")} className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Meu Perfil</button>
                            <button role="menuitem" onClick={() => router.push("/perfil/editar/1")} className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Editar Perfil</button>
                            <a onClick={() => router.push("/cliente/1/alterar")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Alterar Perfil cliente</a>
                            <a onClick={() => router.push("/cliente/cadastro")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Criar Conta</a>
                            <a onClick={() => router.push("/voluntario/cadastro")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Ser Voluntario</a>
                            <button role="menuitem" onClick={() => router.push("/agendamento")} className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Meus Agendamentos</button>
                            <button role="menuitem" onClick={() => router.push("/dados_pessoais")} className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Meus Dados</button>
                            <a onClick={() => router.push("/chat")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Minhas Mensagens</a>
                            <button role="menuitem" onClick={() => router.push("/")} className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Sair</button>
                        </div>
                    )}
                </div>
            </div>

            {menuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-md md:hidden z-40 mx-4">
                    <nav className="flex flex-col p-4 space-y-2 text-gray-700" aria-label="Menu de navegação mobile">
                        <button onClick={() => router.push("/home")} aria-label="Ir para Home" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Home</button>
                        <button onClick={() => router.push("/servicos")} aria-label="Ir para Serviços" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Serviços</button>
                        <button onClick={() => router.push("/sobrenos")} aria-label="Ir para Sobre nós" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Sobre nós</button>
                        <button onClick={() => router.push("/voluntario")} aria-label="Ir para Voluntários" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Voluntários</button>
                        <button onClick={() => router.push("/postagens")} aria-label="Ir para Notícias" className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Notícias</button>
                        <hr className="my-2" />
                        <button onClick={() => router.push("/perfil")} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Meu Perfil</button>
                        <button onClick={() => router.push("/agendamento")} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Meus Agendamentos</button>
                        <button onClick={() => router.push("/")} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer text-red-600">Sair</button>
                    </nav>
                </div>
            )}
        </header>
    );
}





