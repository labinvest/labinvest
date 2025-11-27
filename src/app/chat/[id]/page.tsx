"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SuccessModal from "@/componentes/Modal";

interface Mensagem {
    id: number;
    conversaId: number;
    remetente: "cliente" | "voluntario";
    conteudo: string;
    data: string;
}

export default function ChatConversa() {
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);
    const [novaMensagem, setNovaMensagem] = useState("");
    const [perfil, setPerfil] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '' });
    const router = useRouter();
    const params = useParams();
    const conversaId = Number(params.id);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const perfilStorage = localStorage.getItem("perfil");
        setPerfil(perfilStorage);
        carregarMensagens();
    }, [conversaId]);

    useEffect(() => {
        scrollToBottom();
    }, [mensagens]);

    const carregarMensagens = () => {
        fetch(`/api/chat/${conversaId}`)
            .then(res => res.json())
            .then(data => setMensagens(data))
            .catch(err => console.error("Erro ao carregar mensagens:", err));
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const enviarMensagem = async () => {
        if (!novaMensagem.trim()) return;

        setLoading(true);
        const remetente = perfil === "usuario" ? "cliente" : "voluntario";

        try {
            const response = await fetch(`/api/chat/${conversaId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    remetente,
                    conteudo: novaMensagem
                })
            });

            if (response.ok) {
                const mensagemEnviada = await response.json();
                setMensagens([...mensagens, mensagemEnviada]);
                setNovaMensagem("");
            }
        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
            setModalConfig({ title: 'Erro', message: 'Erro ao enviar mensagem. Tente novamente.' });
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            enviarMensagem();
        }
    };

    const formatarHora = (dataISO: string) => {
        return new Date(dataISO).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const ehMinhaMensagem = (mensagem: Mensagem) => {
        if (perfil === "usuario") {
            return mensagem.remetente === "cliente";
        } else {
            return mensagem.remetente === "voluntario";
        }
    };

    return (
        <div className="max-w-5xl mx-auto h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-md p-4 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="text-green-700 hover:text-green-800"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-800">
                        {perfil === "usuario" ? "Voluntário" : "Cliente"}
                    </h1>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
            </div>

            {/* Área de mensagens */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {mensagens.map((mensagem) => (
                    <div
                        key={mensagem.id}
                        className={`flex mb-4 ${
                            ehMinhaMensagem(mensagem) ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                ehMinhaMensagem(mensagem)
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-gray-800 shadow"
                            }`}
                        >
                            <p className="text-sm break-words">{mensagem.conteudo}</p>
                            <span
                                className={`text-xs mt-1 block ${
                                    ehMinhaMensagem(mensagem)
                                        ? "text-green-100"
                                        : "text-gray-500"
                                }`}
                            >
                                {formatarHora(mensagem.data)}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input de mensagem */}
            <Box
                sx={{
                    p: 2,
                    backgroundColor: "white",
                    borderTop: "1px solid #e5e7eb",
                    display: "flex",
                    gap: 2,
                    alignItems: "center"
                }}
            >
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    size="small"
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                />
                <Button
                    variant="contained"
                    color="success"
                    onClick={enviarMensagem}
                    disabled={loading || !novaMensagem.trim()}
                    sx={{
                        minWidth: "50px",
                        height: "40px",
                        textTransform: "none"
                    }}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
            </Box>
            
            <SuccessModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalConfig.title}
                message={modalConfig.message}
            />
        </div>
    );
}
