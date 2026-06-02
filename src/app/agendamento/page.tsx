"use client";
import { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheckCircle, faTimesCircle, faMapMarkerAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/services/api";

const STATUS_LABEL: Record<string, { label: string; color: string; border: string }> = {
  AGENDADO:   { label: "Aguardando",  color: "bg-blue-100 text-blue-700",  border: "border-blue-400" },
  CONFIRMADO: { label: "Confirmado",  color: "bg-green-100 text-green-700",border: "border-green-500" },
  REALIZADO:  { label: "Realizado",   color: "bg-gray-100 text-gray-600",  border: "border-gray-400" },
  CANCELADO:  { label: "Cancelado",   color: "bg-red-100 text-red-700",    border: "border-red-400" },
};

function whatsappLink(telefone?: string | null) {
  if (!telefone) return null;
  const numero = telefone.replace(/\D/g, "");
  const com55 = numero.startsWith("55") ? numero : `55${numero}`;
  return `https://wa.me/${com55}`;
}

function formatarData(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

interface Agendamento {
  id: number;
  titulo?: string;
  descricao?: string;
  dataInicio: string;
  dataFim?: string;
  status: string;
  local?: string;
  cliente?: { id: number; nome: string; telefone?: string | null };
  voluntario?: { id: number; nome: string; telefone?: string | null };
  servico?: { id: number; nome: string };
}

const TAB_STATUS: Record<string, string[]> = {
  "1": ["AGENDADO"],
  "2": ["CONFIRMADO", "REALIZADO"],
  "3": ["CANCELADO"],
};

export default function TelaAgendamentos() {
  const router = useRouter();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [tab, setTab] = useState("1");
  const [busca, setBusca] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [atualizando, setAtualizando] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const authRes = await fetchAPI("/auth/perfil");
        const user = authRes?.dados;
        if (!user) return;

        const userRole = String(user.role || "").toLowerCase();
        setRole(userRole);

        const perfilId = user.perfil?.id;
        if (!perfilId) return;

        const param = userRole === "voluntario" ? "voluntarioPerfilId" : "clientePerfilId";
        const res = await fetchAPI(`/agendamentos?${param}=${perfilId}&limit=100`);
        setAgendamentos(res?.agendamentos ?? []);
      } catch {
        // sem sessão ou erro de rede
      } finally {
        setCarregando(false);
      }
    }
    load();
  }, []);

  async function atualizarStatus(id: number, status: string) {
    setAtualizando(id);
    try {
      await fetchAPI(`/agendamentos/${id}/status`, { method: "PATCH", body: { status } });
      setAgendamentos((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    } catch {
      alert("Erro ao atualizar agendamento.");
    } finally {
      setAtualizando(null);
    }
  }

  const filtrados = useMemo(() => {
    const statusAlvo = TAB_STATUS[tab] ?? [];
    return agendamentos
      .filter((a) => statusAlvo.includes(a.status))
      .filter((a) => {
        const texto = busca.toLowerCase();
        if (!texto) return true;
        return (
          (a.titulo ?? "").toLowerCase().includes(texto) ||
          (a.servico?.nome ?? "").toLowerCase().includes(texto) ||
          (a.cliente?.nome ?? "").toLowerCase().includes(texto) ||
          (a.voluntario?.nome ?? "").toLowerCase().includes(texto)
        );
      })
      .filter((a) => {
        if (!filtroData) return true;
        return a.dataInicio.startsWith(filtroData);
      });
  }, [agendamentos, tab, busca, filtroData]);

  function renderCard(a: Agendamento) {
    const info = STATUS_LABEL[a.status] ?? { label: a.status, color: "bg-gray-100 text-gray-600", border: "border-gray-300" };
    const isVoluntario = role === "voluntario";
    return (
      <li
        key={a.id}
        className={`bg-white shadow rounded-xl border-l-4 ${info.border} p-5 space-y-2`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">
              {a.titulo || a.servico?.nome || "Atendimento"}
            </h2>
            {a.servico?.nome && a.titulo && (
              <p className="text-sm text-gray-500">{a.servico.nome}</p>
            )}
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                {formatarData(a.dataInicio)}
              </span>
              {a.local && (
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                  {a.local}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                {isVoluntario
                  ? (a.cliente?.nome || "Cliente")
                  : (a.voluntario?.nome || "Voluntário")}
              </span>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${info.color}`}>
            {info.label}
          </span>
        </div>

        <div className="flex gap-2 pt-1 flex-wrap">
          <button
            onClick={() => router.push(`/agendamento/${a.id}`)}
            className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Detalhes
          </button>

          {/* WhatsApp do voluntário — visível para o cliente em agendamentos confirmados */}
          {a.status === "CONFIRMADO" && !isVoluntario && whatsappLink(a.voluntario?.telefone) && (
            <a
              href={whatsappLink(a.voluntario?.telefone)!}
              target="_blank"
              rel="noopener noreferrer"
              title={`WhatsApp de ${a.voluntario?.nome ?? "voluntário"}`}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <WhatsAppIcon sx={{ fontSize: 16 }} />
              WhatsApp
            </a>
          )}

          {/* WhatsApp do cliente — visível para o voluntário em agendamentos confirmados */}
          {a.status === "CONFIRMADO" && isVoluntario && whatsappLink(a.cliente?.telefone) && (
            <a
              href={whatsappLink(a.cliente?.telefone)!}
              target="_blank"
              rel="noopener noreferrer"
              title={`WhatsApp de ${a.cliente?.nome ?? "cliente"}`}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <WhatsAppIcon sx={{ fontSize: 16 }} />
              WhatsApp
            </a>
          )}

          {/* Botões para voluntário confirmar/cancelar */}
          {isVoluntario && a.status === "AGENDADO" && (
            <>
              <button
                disabled={atualizando === a.id}
                onClick={() => atualizarStatus(a.id, "CONFIRMADO")}
                className="text-sm px-3 py-1.5 bg-green-700 text-white rounded-lg hover:bg-green-800 transition flex items-center gap-1"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                Confirmar
              </button>
              <button
                disabled={atualizando === a.id}
                onClick={() => atualizarStatus(a.id, "CANCELADO")}
                className="text-sm px-3 py-1.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center gap-1"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="text-xs" />
                Recusar
              </button>
            </>
          )}

          {/* Botão para cliente cancelar */}
          {!isVoluntario && (a.status === "AGENDADO" || a.status === "CONFIRMADO") && (
            <button
              disabled={atualizando === a.id}
              onClick={() => atualizarStatus(a.id, "CANCELADO")}
              className="text-sm px-3 py-1.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </li>
    );
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando agendamentos...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {role === "voluntario" ? "Meus Atendimentos" : "Meus Agendamentos"}
      </h1>

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <TabList onChange={(_, v) => setTab(v)}>
            <Tab label={`Solicitações (${agendamentos.filter(a => a.status === "AGENDADO").length})`} value="1" />
            <Tab label={`Confirmados (${agendamentos.filter(a => a.status === "CONFIRMADO" || a.status === "REALIZADO").length})`} value="2" />
            <Tab label={`Cancelados (${agendamentos.filter(a => a.status === "CANCELADO").length})`} value="3" />
          </TabList>
        </Box>

        {/* Filtros */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
          <TextField
            label="Buscar por título, serviço ou pessoa"
            variant="outlined"
            size="small"
            fullWidth
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <TextField
            type="date"
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
            label="Filtrar por data"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          />
        </Box>

        {["1", "2", "3"].map((v) => (
          <TabPanel key={v} value={v} sx={{ px: 0 }}>
            {filtrados.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                Nenhum agendamento encontrado.
              </div>
            ) : (
              <ul className="space-y-4">
                {filtrados.map(renderCard)}
              </ul>
            )}
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}
