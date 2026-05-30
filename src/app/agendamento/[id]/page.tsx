"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt, faCheckCircle, faArrowLeft,
  faClock, faUser, faMapMarkerAlt, faNotesMedical,
  faTag, faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import SuccessModal from "@/components/Modal";
import { fetchAPI } from "@/services/api";

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  AGENDADO:   { label: "Aguardando confirmação", color: "text-blue-600" },
  CONFIRMADO: { label: "Confirmado",             color: "text-green-700" },
  REALIZADO:  { label: "Realizado",              color: "text-gray-600" },
  CANCELADO:  { label: "Cancelado",              color: "text-red-600" },
};

function formatarData(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AgendamentoDetalhado() {
  const router = useRouter();
  const { id } = useParams();
  const [role, setRole] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [agendamento, setAgendamento] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: "", message: "" });

  useEffect(() => {
    async function load() {
      try {
        const [authRes, agRes] = await Promise.all([
          fetchAPI("/auth/perfil"),
          fetchAPI(`/agendamentos/${id}`),
        ]);
        setRole(String(authRes?.dados?.role || "").toLowerCase());
        const ag = agRes?.dados ?? agRes;
        if (ag?.id) setAgendamento(ag);
      } catch {
        // agendamento não encontrado ou sem sessão
      } finally {
        setCarregando(false);
      }
    }
    if (id) load();
  }, [id]);

  async function atualizarStatus(novoStatus: string, mensagemSucesso: string) {
    setProcessando(true);
    try {
      await fetchAPI(`/agendamentos/${id}/status`, {
        method: "PATCH",
        body: { status: novoStatus },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setAgendamento((prev: any) => ({ ...prev, status: novoStatus }));
      setModalConfig({ title: "Sucesso!", message: mensagemSucesso });
    } catch (e: unknown) {
      setModalConfig({ title: "Erro", message: e instanceof Error ? e.message : "Erro ao atualizar." });
    } finally {
      setProcessando(false);
      setModalOpen(true);
    }
  }

  async function excluir() {
    if (!confirm("Tem certeza que deseja excluir este agendamento?")) return;
    setProcessando(true);
    try {
      await fetchAPI(`/agendamentos/${id}`, { method: "DELETE" });
      setModalConfig({ title: "Sucesso!", message: "Agendamento excluído com sucesso." });
      setModalOpen(true);
    } catch {
      setModalConfig({ title: "Erro", message: "Erro ao excluir agendamento." });
      setModalOpen(true);
      setProcessando(false);
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando agendamento...
      </div>
    );
  }

  if (!agendamento) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <p className="text-red-600 font-semibold">Agendamento não encontrado.</p>
        <button onClick={() => router.back()} className="mt-4 text-green-700 hover:underline flex items-center gap-2">
          <FontAwesomeIcon icon={faArrowLeft} /> Voltar para lista
        </button>
      </div>
    );
  }

  const statusInfo = STATUS_LABEL[agendamento.status] ?? { label: agendamento.status, color: "text-gray-600" };
  const isVoluntario = role === "voluntario";
  const isCliente = role === "cliente";

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <button onClick={() => router.back()} className="mb-6 text-green-700 hover:underline flex items-center gap-2 text-sm">
        <FontAwesomeIcon icon={faArrowLeft} /> Voltar para lista
      </button>

      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">

        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {agendamento.titulo || agendamento.servico?.nome || "Atendimento"}
            </h1>
            {agendamento.servico?.nome && agendamento.titulo && (
              <p className="text-sm text-gray-500 mt-1">{agendamento.servico.nome}</p>
            )}
          </div>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-gray-100 ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Informações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Info icon={faCalendarAlt} label="Início" value={formatarData(agendamento.dataInicio)} />
          {agendamento.dataFim && (
            <Info icon={faClock} label="Término" value={formatarData(agendamento.dataFim)} />
          )}
          {agendamento.servico?.nome && (
            <Info icon={faTag} label="Serviço" value={agendamento.servico.nome} />
          )}
          {agendamento.local && (
            <Info icon={faMapMarkerAlt} label="Local" value={agendamento.local} />
          )}
          {agendamento.cliente?.nome && (
            <Info icon={faUser} label="Cliente" value={agendamento.cliente.nome} />
          )}
          {agendamento.voluntario?.nome && (
            <Info icon={faUser} label="Voluntário" value={agendamento.voluntario.nome} />
          )}
        </div>

        {agendamento.descricao && (
          <div>
            <h2 className="text-base font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <FontAwesomeIcon icon={faNotesMedical} className="text-green-600" />
              Descrição
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{agendamento.descricao}</p>
          </div>
        )}

        {agendamento.notas && (
          <div>
            <h2 className="text-base font-semibold text-gray-700 mb-1">Observações</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{agendamento.notas}</p>
          </div>
        )}

        {/* Ações do Voluntário */}
        {isVoluntario && agendamento.status === "AGENDADO" && (
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="contained" color="success" fullWidth disabled={processando}
              onClick={() => atualizarStatus("CONFIRMADO", "Agendamento confirmado com sucesso!")}
              sx={{ textTransform: "none", fontWeight: 600 }}
              startIcon={<FontAwesomeIcon icon={faCheckCircle} />}
            >
              Confirmar Agendamento
            </Button>
            <Button
              variant="outlined" color="error" fullWidth disabled={processando}
              onClick={() => atualizarStatus("CANCELADO", "Agendamento recusado.")}
              sx={{ textTransform: "none", fontWeight: 600 }}
              startIcon={<FontAwesomeIcon icon={faTimesCircle} />}
            >
              Recusar
            </Button>
          </div>
        )}

        {isVoluntario && agendamento.status === "CONFIRMADO" && (
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="contained" color="success" fullWidth disabled={processando}
              onClick={() => atualizarStatus("REALIZADO", "Atendimento marcado como realizado!")}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Marcar como Realizado
            </Button>
          </div>
        )}

        {/* Ações do Cliente */}
        {isCliente && (agendamento.status === "AGENDADO" || agendamento.status === "CONFIRMADO") && (
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outlined" color="error" fullWidth disabled={processando}
              onClick={() => atualizarStatus("CANCELADO", "Agendamento cancelado.")}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Cancelar Agendamento
            </Button>
          </div>
        )}

        {/* Excluir (cancelados) */}
        {agendamento.status === "CANCELADO" && (
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outlined" color="error" fullWidth disabled={processando}
              onClick={excluir}
              sx={{ textTransform: "none" }}
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
          if (modalConfig.title === "Sucesso!" && agendamento.status === "CANCELADO") {
            router.push("/agendamento");
          }
        }}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </div>
  );
}

function Info({ icon, label, value }: { icon: typeof faCalendarAlt; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <FontAwesomeIcon icon={icon} className="text-green-600 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-gray-800 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
