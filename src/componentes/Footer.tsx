export default function Footer() {
    return (
        <footer className="flex flex-col w-full bg-green-700 h-[50%] p-5 text-white items-center justify-around">
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
                <button className="bg-[#B2B3CF] rounded-full px-[10px] py-[3px]">Inscrever</button>
            </div>
            <div className="flex justify-between w-[40%] p-2">
                <p className="px-5">Carreira</p>
                <p>Politica de Privacidade</p>
                <p>Termos & Condições</p>
            </div>
            <p>© 2021 Lab Invest Inc. </p>
        </footer>
    )
}