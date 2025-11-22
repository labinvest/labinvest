"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCircle } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface Conversa {
    id: number;
    voluntarioId: number;
    voluntarioNome: string;
    clienteId: number;
    clienteNome: string;
    ultimaMensagem: string;
    dataUltimaMensagem: string;
    naoLidas: number;
}

export default function ChatListagem() {
    const [conversas, setConversas] = useState<Conversa[]>([]);
    const [filtro, setFiltro] = useState("");
    const [perfil, setPerfil] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const perfilStorage = localStorage.getItem("perfil");
        setPerfil(perfilStorage);
        
        fetch("/api/chat")
            .then(res => res.json())
            .then(data => setConversas(data))
            .catch(err => console.error("Erro ao carregar conversas:", err));
    }, []);

    const conversasFiltradas = conversas.filter((conversa) =>
        conversa.voluntarioNome.toLowerCase().includes(filtro.toLowerCase()) ||
        conversa.clienteNome.toLowerCase().includes(filtro.toLowerCase()) ||
        conversa.ultimaMensagem.toLowerCase().includes(filtro.toLowerCase())
    );

    const formatarData = (dataISO: string) => {
        const data = new Date(dataISO);
        const hoje = new Date();
        const ontem = new Date(hoje);
        ontem.setDate(ontem.getDate() - 1);

        if (data.toDateString() === hoje.toDateString()) {
            return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        } else if (data.toDateString() === ontem.toDateString()) {
            return "Ontem";
        } else {
            return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Mensagens</h1>

            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Buscar conversas"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </Box>

            {conversasFiltradas.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <FontAwesomeIcon icon={faComment} className="text-6xl mb-4" />
                    <p className="text-lg">Nenhuma conversa encontrada</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {conversasFiltradas.map((conversa) => (
                        <li
                            key={conversa.id}
                            onClick={() => router.push(`/chat/${conversa.id}`)}
                            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-green-600"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {perfil === "usuario" ? conversa.voluntarioNome : conversa.clienteNome}
                                        </h2>
                                        {conversa.naoLidas > 0 && (
                                            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                {conversa.naoLidas}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-1">
                                        {conversa.ultimaMensagem}
                                    </p>
                                </div>
                                <div className="text-right ml-4">
                                    <span className="text-xs text-gray-500">
                                        {formatarData(conversa.dataUltimaMensagem)}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
