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

            <nav className="hidden md:flex space-x-10 text-base font-semibold text-gray-600">
                <a className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/home")} >Home</a>
                <a className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/servicos")}>Serviços</a>
                <a className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/sobrenos")}>Sobre nós</a>
                <a className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/voluntario")}>Voluntários</a>
                <a className="transition duration-300 hover:text-green-700 cursor-pointer" onClick={() => router.push("/postagens")}>Notícias</a>
            </nav>

            <div className="relative items-center ml-4 hidden md:flex">
                <div className="relative">
                    <button
                        id="profileButton"
                        aria-label="User profile"
                        aria-expanded={profileOpen}
                        onClick={() => setProfileOpen((s) => !s)}
                        className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full p-2 shadow-lg hover:scale-105 transition focus:outline-none cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </button>

                    {profileOpen && (
                        <div id="profileDropdown" className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-50">
                            <a onClick={() => router.push("/")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Entrar</a>
                            <a onClick={() => router.push("/perfil")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Meu Perfil</a>
                            <a onClick={() => router.push("/perfil/editar/1")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Editar Perfil</a>
                            <a onClick={() => router.push("/agendamento")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Meus Agendamentos</a>
                            <a onClick={() => router.push("/dados_pessoais")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Meus Dados</a>
                            <a onClick={() => router.push("/")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Sair</a>
                        </div>
                    )}
                </div>
            </div>

            {menuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-md md:hidden z-40 mx-4">
                    <nav className="flex flex-col p-4 space-y-2 text-gray-700">
                        <button onClick={() => router.push("/home")} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Home</button>
                        <button onClick={() => router.push("/servicos")} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Serviços</button>
                        <button onClick={() => router.push("/sobrenos")} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Sobre nós</button>
                        <button onClick={() => router.push("/voluntario")} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Voluntários</button>
                        <button onClick={() => router.push("/postagens")} className="text-left px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Notícias</button>
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





