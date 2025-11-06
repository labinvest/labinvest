"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTag,
  faCheckCircle,
  faArrowLeft,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";

const agendamentos = [
  {
    id: 1,
    titulo: "Consulta médica",
    data: "2025-11-05",
    hora: "14:30",
    tipo: "Saúde",
    status: "Confirmado",
    local: "Clínica Vida Saudável",
    profissional: "Dra. Ana Paula",
    observacoes: "Levar exames anteriores e lista de medicamentos.",
  },
  {
    id: 2,
    titulo: "Reunião com cliente",
    data: "2025-11-07",
    hora: "10:00",
    tipo: "Trabalho",
    status: "Pendente",
    local: "Escritório Central",
    profissional: "Sr. João Silva",
    observacoes: "Apresentar proposta comercial.",
  },
];

export default function AgendamentoDetalhado() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const agendamento = agendamentos.find((item) => item.id === id);

  if (!agendamento) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <p className="text-red-600 font-semibold">Agendamento não encontrado.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-green-700 hover:underline flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Voltar para lista
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <button
        onClick={() => router.back()}
        className="mb-6 text-green-700 hover:underline flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Voltar para lista
      </button>

      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">{agendamento.titulo}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-green-600" />
            <span className="text-gray-700">{agendamento.data}</span>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faClock} className="text-green-600" />
            <span className="text-gray-700">{agendamento.hora}</span>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faTag} className="text-green-600" />
            <span className="text-gray-700">{agendamento.tipo}</span>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
            <span className="text-gray-700">{agendamento.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faUser} className="text-green-600" />
            <span className="text-gray-700">{agendamento.profissional}</span>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0L6.343 16.657M15 11V7a4 4 0 00-8 0v4" />
            </svg>
            <span className="text-gray-700">{agendamento.local}</span>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Observações</h2>
          <p className="text-gray-700">{agendamento.observacoes}</p>
        </div>
      </div>
    </div>
  );
}
