"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faEnvelope,
    faPhone,
    faBriefcase,
    faBullseye,
    faLightbulb,
    faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

export default function EditarPerfil() {
    const [perfil, setPerfil] = useState({
        nome: "Admin",
        email: "admin@labinvest.com",
        telefone: "(11) 11111-1111",
        profissao: "Microempreendedora",
        descricao:
            "Trabalho o mês todo, mas o dinheiro sempre sumia — e eu nem sabia pra onde. Gosto de curtir um som, sair no fim de semana, pedir um lanche assistindo série... mas também quero ter paz no fim do mês.",
    });

    const [objetivos, setObjetivos] = useState([
        "Organizar os gastos mensais",
        "Quitar dívidas pequenas e equilibrar o fluxo de caixa",
        "Aprender a controlar as finanças do negócio",
        "Criar uma reserva de emergência",
        "Começar a investir com segurança",
    ]);

    const [motivacoes, setMotivacoes] = useState([
        "Ter mais tranquilidade e segurança",
        "Parar de depender do limite do banco",
        "Fazer o dinheiro render melhor",
        "Crescer o negócio de forma mais planejada",
    ]);

    const [desafios, setDesafios] = useState([
        "Falta de tempo e rotina corrida",
        "Medo de termos técnicos",
        "Dificuldade em manter constância no controle financeiro",
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPerfil((prev) => ({ ...prev, [name]: value }));
    };

    const handleListChange = (
        index: number,
        value: string,
        list: string[],
        setList: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const updated = [...list];
        updated[index] = value;
        setList(updated);
    };

    const [mensagemSalva, setMensagemSalva] = useState(false);

    const salvarAlteracoes = () => {

        localStorage.setItem("perfil", JSON.stringify(perfil));
        localStorage.setItem("objetivos", JSON.stringify(objetivos));
        localStorage.setItem("motivacoes", JSON.stringify(motivacoes));
        localStorage.setItem("desafios", JSON.stringify(desafios));

        setMensagemSalva(true);

        setTimeout(() => setMensagemSalva(false), 3000);
    };

    const renderCamposEditaveis = (
        titulo: string,
        cor: string,
        icon: any,
        lista: string[],
        setLista: React.Dispatch<React.SetStateAction<string[]>>
    ) => (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className={`bg-${cor}-100 p-3 rounded-full`}>
                    <FontAwesomeIcon icon={icon} className={`text-${cor}-700 text-2xl`} />
                </div>
                <h3 className={`text-xl font-bold text-${cor}-700`}>{titulo}</h3>
            </div>
            <div className="space-y-4">
                {lista.map((item, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            {`${titulo.slice(0, -1)} ${index + 1}`}
                        </label>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleListChange(index, e.target.value, lista, setLista)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="rounded-2xl shadow-lg p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl">
                            <img src="/images/easter.jpg" alt="Foto de perfil" className="w-40 h-40 object-cover" />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <input
                                type="text"
                                name="nome"
                                value={perfil.nome}
                                onChange={handleChange}
                                className="text-3xl font-bold text-gray-800 bg-transparent border-b border-gray-300 w-full"
                            />
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <FontAwesomeIcon icon={faBriefcase} className="text-green-700" />
                                <input
                                    type="text"
                                    name="profissao"
                                    value={perfil.profissao}
                                    onChange={handleChange}
                                    className="text-gray-600 bg-transparent border-b border-gray-300 w-full"
                                />
                            </div>
                            <textarea
                                name="descricao"
                                value={perfil.descricao}
                                onChange={handleChange}
                                rows={4}
                                className="text-gray-700 bg-transparent border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações de Contato</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Nome", icon: faUser, name: "nome" },
                            { label: "Email", icon: faEnvelope, name: "email" },
                            { label: "Telefone", icon: faPhone, name: "telefone" },
                            { label: "Profissão", icon: faBriefcase, name: "profissao" },
                        ].map(({ label, icon, name }) => (
                            <div key={name} className="flex items-center gap-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FontAwesomeIcon icon={icon} className="text-green-700 text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{label}</p>
                                    <input
                                        type="text"
                                        name={name}
                                        value={perfil[name as keyof typeof perfil]}
                                        onChange={handleChange}
                                        className="font-semibold text-gray-800 bg-transparent border-b border-gray-300 w-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {renderCamposEditaveis("Objetivos", "green", faBullseye, objetivos, setObjetivos)}
                    {renderCamposEditaveis("Motivações", "blue", faLightbulb, motivacoes, setMotivacoes)}
                    {renderCamposEditaveis("Desafios", "red", faExclamationTriangle, desafios, setDesafios)}
                </div>

                {mensagemSalva && (
                    <div className="mt-4 text-green-700 font-medium text-sm text-right">
                        ✅ Alterações salvas com sucesso!
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        onClick={salvarAlteracoes}
                        className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
                    >
                        Salvar alterações
                    </button>
                </div>
            </div>
        </div>
    );
}
