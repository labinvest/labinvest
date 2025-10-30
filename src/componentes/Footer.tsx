'use client'

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Footer() {
    const router = useRouter();
    const pathname = usePathname();
    return (
        !['/'].includes(pathname) && 
        
            <footer className="flex flex-col w-full bg-green-700 p-5 text-white items-center justify-around">
                <div className="flex items-center p-2">
                    <h1 className="text-white text-3xl font-bold mb-3 border-r-2 border-white p-5">Lab Invest</h1>
                    <div className="flex flex-col justify-center h-10 ml-5">
                        <p className="text-white text-sm font-bold">Simples</p>
                        <p className="text-white text-sm font-bold">Claro</p>
                        <p className="text-white text-sm font-bold">Eficiente</p>
                    </div>
                </div>
                <p>Obtenha nosso Newsletter</p>
                <div className="p-3">
                    <input type="text" className="bg-transparent rounded-full border border-white py-[2px] px-[10px]"
                        placeholder="Digite seu email" />
                    <button className="bg-[#B2B3CF] rounded-full px-[10px] py-[3px] cursor-pointer" onClick={() => (window.location.href = "https://pt.wikipedia.org/wiki/Esquema_em_pir%C3%A2mide#:~:text=O%20site%20do%20FBI%20afirma,para%20comercializar%20um%20determinado%20produto.")}>Inscrever</button>
                </div>
                <div className="flex justify-between w-[40%] p-2 cursor-pointer">
                    <p className="px-5">Carreira</p>
                    <p>Politica de Privacidade</p>
                    <p>Termos & Condições</p>
                    <p onClick={() => router.push('/faq')}>FAQ</p>
                </div>
                <p>© 2025 Lab Invest Inc. </p>
            </footer>
        
    );
}