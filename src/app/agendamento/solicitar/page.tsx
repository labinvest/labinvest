'use client';

import React from "react";

interface SolicitarAgendamento {
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    telefone: number;
    profissao: string;
    dataPreferida: string;
}

export default function SolicitarAgendamentoForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
        >
            <h2 className="text-2xl font-semibold text-center mb-4">Solicitar Agendamento</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    required
                    className="border rounded-md px-4 py-2 w-full"
                />
                <input
                    type="text"
                    name="sobrenome"
                    placeholder="Sobrenome"
                    required
                    className="border rounded-md px-4 py-2 w-full"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="border rounded-md px-4 py-2 w-full"
                />
                <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    required
                    className="border rounded-md px-4 py-2 w-full"
                />
                <input
                    type="tel"
                    name="telefone"
                    placeholder="Telefone"
                    required
                    className="border rounded-md px-4 py-2 w-full"
                />
                <input
                    type="text"
                    name="profissao"
                    placeholder="Profissão"
                    required
                    className="border rounded-md px-4 py-2 w-full"
                />
                <input
                    type="date"
                    name="dataPreferida"
                    required
                    className="border rounded-md px-4 py-2 w-full md:col-span-2"
                />
            </div>

            <button type="submit"
                className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
            >
                Solicitar Agendamento
            </button>
        </form>
    );
}