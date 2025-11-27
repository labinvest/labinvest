"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTag,
  faCheckCircle,
  faArrowLeft,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import SuccessModal from "@/componentes/Modal";



export default function AgendamentoDetalhado() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [perfil, setPerfil] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', message: '' });

  useEffect(() => {
    const perfilStorage = localStorage.getItem("perfil");
    setPerfil(perfilStorage);
  }, []);

  const [agendamento,setAgendamento ] =  useState<any>(); 


  useEffect(() => {
    
    fetch(`/api/agendamento/${id}`, {
      method: "GET"
    }).then((async (response) => { 
      const data = await response.json();
      setAgendamento(data);
        }));
  }, [id]);


  const handleAceitar = () => {
    console.log(`Agendamento ${id} aceito pelo voluntário`);
    setModalConfig({ title: 'Sucesso!', message: 'Agendamento aceito com sucesso!' });
    setModalOpen(true);
  };

  const handleRecusar = () => {
    console.log(`Agendamento ${id} recusado pelo voluntário`);
    setModalConfig({ title: 'Aviso', message: 'Agendamento recusado.' });
    setModalOpen(true);
  };

  const handleCancelar = () => {
    console.log(`Agendamento ${id} cancelado pelo usuário`);
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      setModalConfig({ title: 'Sucesso!', message: 'Agendamento cancelado com sucesso!' });
      setModalOpen(true);
    }
  };

  const handleExcluir = async () => {
    if (confirm("Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita.")) {
      try {
        const response = await fetch(`/api/agendamento/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setModalConfig({ title: 'Sucesso!', message: 'Agendamento excluído com sucesso!' });
          setModalOpen(true);
        } else {
          setModalConfig({ title: 'Erro', message: 'Erro ao excluir agendamento.' });
          setModalOpen(true);
        }
      } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        setModalConfig({ title: 'Erro', message: 'Erro ao excluir agendamento.' });
        setModalOpen(true);
      }
    }
  };

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

        {/* Debug info */}
        <div className="text-xs text-gray-400">
          Perfil: {perfil} | Status: "{agendamento.status}"
        </div>

        {/* Botões de ação baseados no perfil */}
        {perfil === "voluntario" && agendamento.status !== "Cancelado" && agendamento.status !== "Confirmado" && (
          <div className="flex gap-4 mt-6 pt-6 border-t">
            <Button
              variant="contained"
              color="success"
              size="large"
              fullWidth
              onClick={handleAceitar}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Aceitar Agendamento
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              fullWidth
              onClick={handleRecusar}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Recusar Agendamento
            </Button>
          </div>
        )}

        {perfil === "usuario" && agendamento.status !== "Cancelado" && (
          <div className="flex gap-4 mt-6 pt-6 border-t">
            <Button
              variant="contained"
              color="error"
              size="large"
              fullWidth
              onClick={handleCancelar}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Cancelar Agendamento
            </Button>
          </div>
        )}

        {(perfil === "usuario" || perfil === "voluntario") && agendamento.status === "Cancelado" && (
          <div className="flex gap-4 mt-6 pt-6 border-t">
            <Button
              variant="contained"
              color="error"
              size="large"
              fullWidth
              onClick={handleExcluir}
              sx={{ textTransform: "none", fontWeight: "bold", bgcolor: "#b91c1c", "&:hover": { bgcolor: "#991b1b" } }}
            >
              Excluir Agendamento
            </Button>
          </div>
        )}
      </div>
      
      <SuccessModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (modalConfig.title === 'Sucesso!') {
            router.back();
          }
        }}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </div>
  );
}
