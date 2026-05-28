"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faBullseye,
    faLightbulb,
    faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import CardMetas from "@/components/CardMetas";
import { useFormik } from "formik";

export default function EditarPerfil() {

    const formik = useFormik({
        initialValues: {
            nome: "Admin",
            email: "admin@labinvest.com",
            telefone: "(11) 11111-1111",
            profissao: "Microempreendedora",
            celular: "(11) 91111-1111",
            linkedin: "https://www.linkedin.com/in/admin",
            descricao:
                "Trabalho o mês todo, mas o dinheiro sempre sumia — e eu nem sabia pra onde. Gosto de curtir um som, sair no fim de semana, pedir um lanche assistindo série... mas também quero ter paz no fim do mês.",
        },
        onSubmit: (values) => {
            
        },
    });



    const [objetivos] = useState([
        "Organizar os gastos mensais",
        "Quitar dívidas pequenas e equilibrar o fluxo de caixa",
        "Aprender a controlar as finanças do negócio",
        "Criar uma reserva de emergência",
        "Começar a investir com segurança",
    ]);

    const [motivacoes] = useState([
        "Ter mais tranquilidade e segurança",
        "Parar de depender do limite do banco",
        "Fazer o dinheiro render melhor",
        "Crescer o negócio de forma mais planejada",
    ]);

    const [desafios] = useState([
        "Falta de tempo e rotina corrida",
        "Medo de termos técnicos",
        "Dificuldade em manter constância no controle financeiro",
    ]);

    const [mensagemSalva, setMensagemSalva] = useState(false);

    const salvarAlteracoes = () => {


        localStorage.setItem("objetivos", JSON.stringify(objetivos));
        localStorage.setItem("motivacoes", JSON.stringify(motivacoes));
        localStorage.setItem("desafios", JSON.stringify(desafios));

        setMensagemSalva(true);

        setTimeout(() => setMensagemSalva(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="rounded-2xl shadow-lg p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl">
                            <img src="/images/easter.jpg" alt="Foto de perfil" className="w-40 h-40 object-cover" />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <TextField
                                type="text"
                                label="Nome"
                                name="nome"
                                value={formik.values.nome}
                                size="small"
                                margin="normal"
                                onChange={formik.handleChange}
                                className="text-3xl font-bold text-gray-800 bg-transparent border-b border-gray-300 w-full"
                        
                            />
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <FontAwesomeIcon icon={faBriefcase} className="text-green-700" />
                                <TextField
                                    label="Profissão"
                                    type="text"
                                    size="small"
                                    name="profissao"
                                    margin="normal"
                                    value={formik.values.profissao}
                                    onChange={formik.handleChange}
                                    className="text-gray-600 bg-transparent border-b border-gray-300 w-full"
                                />
                            </div>
                            <TextField
                                label="Descrição"
                                type="text"
                                multiline
                                name="descricao"
                                value={formik.values.descricao}
                                onChange={formik.handleChange}
                                rows={4}
                                className="text-gray-700 bg-transparent border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações de Contato</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <TextField 
                            label="Link do LinkedIn"
                            type="text"
                            name="linkedin"
                            value={formik.values.linkedin}
                            onChange={formik.handleChange}
                            size="small"
                            margin="normal"
                        />
                        <TextField 
                            label="Telefone"
                            type="text"
                            name="telefone"
                            value={formik.values.telefone}
                            onChange={formik.handleChange}
                            size="small"
                            margin="normal"
                        />
                        <TextField 
                            label="Celular"
                            type="text"
                            name="celular"
                            value={formik.values.celular}
                            onChange={formik.handleChange}
                            size="small"
                            margin="normal"
                        />
                        <TextField 
                            label="Email"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            size="small"
                            margin="normal"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <CardMetas titulo="Objetivos" lista={objetivos} cor="green" icon={faBullseye} />
                    <CardMetas titulo="Motivações" lista={motivacoes} cor="blue" icon={faLightbulb} />
                    <CardMetas titulo="Desafios" lista={desafios} cor="red" icon={faExclamationTriangle} />

                </div>

                {mensagemSalva && (
                    <div className="mt-4 text-green-700 font-medium text-sm text-right">
                        Alterações salvas com sucesso!
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
