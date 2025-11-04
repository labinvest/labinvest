"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faTag, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface Agendamento {
    id: number;
    titulo: string;
    data: string;
    tipo: string;
    status: string;
}

const agendamentosFixos: Agendamento[] = [
    { id: 1, titulo: "Consulta médica", data: "2025-11-05", tipo: "Saúde", status: "Confirmado" },
    { id: 2, titulo: "Reunião com cliente", data: "2025-11-07", tipo: "Trabalho", status: "Pendente" },
    { id: 3, titulo: "Treinamento online", data: "2025-11-10", tipo: "Educação", status: "Confirmado" },
    { id: 4, titulo: "Sessão de terapia", data: "2025-11-12", tipo: "Saúde", status: "Cancelado" },
    { id: 5, titulo: "Planejamento financeiro", data: "2025-11-15", tipo: "Pessoal", status: "Confirmado" },
];

export default function TelaAgendamentos() {
    const [filtro, setFiltro] = useState("");

    const agendamentosFiltrados = agendamentosFixos.filter((item) =>
        item.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        item.tipo.toLowerCase().includes(filtro.toLowerCase()) ||
        item.status.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Meus Agendamentos</h1>
            <input
                type="text"
                placeholder="Filtrar por título, tipo ou status"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md"
            />

            <ul className="space-y-4">
                {agendamentosFiltrados.map((item) => (
                    <li key={item.id} className="bg-white shadow p-4 rounded-lg">
                        <h2 className="text-lg font-semibold">{item.titulo}</h2>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                            {item.data}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <FontAwesomeIcon icon={faTag} className="text-gray-500" />
                            {item.tipo}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-gray-500" />
                            {item.status}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
