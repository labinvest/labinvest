'use client'

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Footer() {
    const router = useRouter();
    const pathname = usePathname();
    return (
        !['/'].includes(pathname) && 
        
            <footer className="flex flex-col w-full bg-green-700 p-5 md:p-8 text-white items-center justify-around gap-4 mt-auto">
                <div className="flex flex-col md:flex-row items-center p-2 gap-4">
                    <h1 className="text-white text-2xl md:text-3xl font-bold md:mb-3 md:border-r-2 border-white md:pr-5">Lab Invest</h1>
                    <div className="flex flex-col justify-center">
                        <p className="text-white text-sm font-bold">Simples</p>
                        <p className="text-white text-sm font-bold">Claro</p>
                        <p className="text-white text-sm font-bold">Eficiente</p>
                    </div>
                </div>
                <p className="text-sm md:text-base">Obtenha nosso Newsletter</p>
                <div className="flex flex-col sm:flex-row gap-2 p-3 items-center">
                    <input type="text" className="bg-transparent rounded-full border border-white py-1 md:py-[2px] px-3 md:px-[10px] w-full sm:w-auto"
                        placeholder="Digite seu email" />
                    <button className="bg-[#B2B3CF] rounded-full px-4 md:px-[10px] py-2 md:py-[3px] cursor-pointer hover:bg-[#9a9bb8] transition w-full sm:w-auto" onClick={() => (window.location.href = "https://pt.wikipedia.org/wiki/Esquema_em_pir%C3%A2mide#:~:text=O%20site%20do%20FBI%20afirma,para%20comercializar%20um%20determinado%20produto.")}>Inscrever</button>
                </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-between w-full md:w-[80%] lg:w-[60%] p-2 gap-3 md:gap-0 text-center md:text-left text-sm cursor-pointer">
                    <p className="hover:underline">Carreira</p>
                    <p className="hover:underline">Política de Privacidade</p>
                    <p className="hover:underline">Termos & Condições</p>
                    <p onClick={() => router.push('/faq')} className="hover:underline">FAQ</p>
                </div>
                <p className="text-xs md:text-sm">© 2025 Lab Invest Inc. </p>
            </footer>
        
    );
}