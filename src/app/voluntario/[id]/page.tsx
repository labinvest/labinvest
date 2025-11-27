"use client";
import React, { useEffect, useState } from "react";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from "next/navigation";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PublishIcon from '@mui/icons-material/Publish';
import ClearIcon from '@mui/icons-material/Clear';

const defaultPostagens = [
  {
    id: 1,
    autor: "Carlos Lima",
    data: "28 de Outubro de 2025",
    conteudo:
      "Participei da ação no bairro Jardim Europa. A receptividade das pessoas foi maravilhosa. Conversamos com moradores sobre educação financeira e distribuímos materiais informativos. Foi uma experiência transformadora.",
    imagem: "/images/Image6.png",
    categoria: "Ação Comunitária",
  },
  {
    id: 2,
    autor: "Carlos Lima",
    data: "15 de Outubro de 2025",
    conteudo:
      "Realizamos uma oficina sobre controle de gastos para empreendedores locais. A troca de experiências foi enriquecedora.",
    imagem: "/images/post2.jpg",
    categoria: "Educação Financeira",
  },
];

export default function PerfilVoluntario() {
  const router = useRouter();

  const [postagens, setPostagens] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [categoria, setCategoria] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagemData, setImagemData] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('postagens');
      if (stored) setPostagens(JSON.parse(stored));
      else setPostagens(defaultPostagens);
    } catch (e) {
      setPostagens(defaultPostagens);
    }
  }, []);

  const saveToStorage = (items: any[]) => {
    try {
      localStorage.setItem('postagens', JSON.stringify(items));
    } catch (e) {
      console.error('Erro salvando postagens', e);
    }
  };

  const handleImage = (file?: File) => {
    if (!file) return setImagemData(null);
    const reader = new FileReader();
    reader.onload = () => {
      setImagemData(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!title && !conteudo) return;
    const novo = {
      id: Date.now(),
      autor: "Carlos Lima",
      data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      conteudo,
      imagem: imagemData,
      categoria: categoria || 'Geral',
    };
    const updated = [novo, ...postagens];
    setPostagens(updated);
    saveToStorage(updated);
    // limpar
    setTitle("");
    setCategoria("");
    setConteudo("");
    setImagemData(null);
    setOpenSnackbar(true);
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files && evt.target.files[0];
    if (file) handleImage(file);
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 min-h-screen py-6">
      <div className="w-full max-w-5xl space-y-8 mx-auto px-4">
        <div className=" shadow-xl p-6 bg-white rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUserCircle} className="text-green-700 text-8xl" />
            </div>

            <div className="flex flex-col text-left">
              <h2 className="font-bold text-gray-800 text-2xl">
                Carlos Lima
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Consultor Financeiro Pessoal e Empresarial
              </p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed max-w-md">
                Mais de 7 anos ajudando pessoas físicas e pequenos negócios a organizarem suas finanças,
                saírem do endividamento e começarem a investir com segurança.
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-25">
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ borderRadius: '999px', textTransform: 'none', fontWeight: 600 }}
              onClick={() => router.push("/chat/1")}
            >
              Mensagem
            </Button>

            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => router.push("/agendamento/solicitar")}
              sx={{ borderRadius: '999px', textTransform: 'none', fontWeight: 600 }}
            >
              Solicitar Agendamento
            </Button>
          </div>
        </div>
        <div className="rounded-2xl p-8 bg-white shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Áreas de Atuação
          </h1>

          <div className="flex flex-col md:flex-row justify-center gap-6 items-stretch">
            <div className="flex-1 flex flex-col border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Especialista Financeiro
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Planejamento e orçamento pessoal/empresarial</li>
                <li>Gestão de fluxo de caixa e controle de despesas</li>
                <li>Análise de investimentos e avaliação de risco</li>
                <li>Reestruturação de dívidas e educação financeira</li>
              </ul>
            </div>

            <div className="flex-1 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Analista Contábil
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Responsável por elaborar demonstrativos financeiros, reconciliar contas e assegurar conformidade fiscal.
                Atua no controle de lançamentos contábeis, análise de balanços e suporte às decisões gerenciais.
              </p>
            </div>

          </div>
        </div>

        <div className="rounded-2xl p-8 bg-white shadow-lg mt-8">
       
         
          <h2 className="text-2xl font-semibold text-center text-gray-800 my-6">Postagens Recentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {postagens.map((post) => (
              <div key={post.id} className="flex flex-col bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-4">
                {post.imagem && (
                  <img src={post.imagem} alt={`Imagem de ${post.autor}`} className="w-full h-64 object-cover rounded-lg mb-4" />
                )}
                <div className="space-y-2 text-left">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{post.categoria}</span>
                  <h4 className="text-xl font-semibold text-gray-900">{post.autor}</h4>
                  <p className="text-sm text-gray-500">{post.data}</p>
                  <p className="text-gray-700 text-base leading-relaxed">{post.conteudo && (post.conteudo.length > 160 ? post.conteudo.slice(0, 160) + "..." : post.conteudo)}</p>
                </div>
              </div>
            ))}
          </div>

          <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>Postagem criada com sucesso.</Alert>
          </Snackbar>

        </div>


      </div>
    </div>
  );
}
