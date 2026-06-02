'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAPI } from '@/services/api';

interface Servico { id: number; nome: string; }
interface Voluntario { id: number; perfil: { id: number; nome: string }; servicos: { servico: Servico }[]; }

function SolicitarAgendamentoForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const voluntarioId = searchParams.get('voluntarioId');

  const [clientePerfilId, setClientePerfilId] = useState<number | null>(null);
  const [voluntario, setVoluntario] = useState<Voluntario | null>(null);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    dataInicio: '',
    local: '',
    notas: '',
    servicoId: '',
  });

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const authRes = await fetchAPI('/auth/perfil');
        const user = authRes?.dados;
        if (!user?.perfil?.id) {
          setErro('Você precisa estar logado como cliente para solicitar um agendamento.');
          setCarregando(false);
          return;
        }
        setClientePerfilId(user.perfil.id);

        if (voluntarioId) {
          const volRes = await fetchAPI(`/voluntarios/${voluntarioId}`);
          const vol = volRes?.dados ?? volRes;
          if (vol?.id) {
            setVoluntario(vol);
            setServicos(vol.servicos?.map((vs: { servico: Servico }) => vs.servico) ?? []);
          }
        }
      } catch {
        setErro('Erro ao carregar dados. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    }
    load();
  }, [voluntarioId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientePerfilId || !voluntario) {
      setErro('Dados insuficientes para criar agendamento.');
      return;
    }
    if (!form.dataInicio) {
      setErro('A data de início é obrigatória.');
      return;
    }

    setEnviando(true);
    setErro('');
    try {
      await fetchAPI('/agendamentos', {
        method: 'POST',
        body: {
          clientePerfilId,
          voluntarioPerfilId: voluntario.perfil.id,
          servicoId: form.servicoId ? Number(form.servicoId) : undefined,
          titulo: form.titulo || undefined,
          descricao: form.descricao || undefined,
          dataInicio: new Date(form.dataInicio).toISOString(),
          local: form.local || undefined,
          notas: form.notas || undefined,
        },
      });
      router.push('/agendamento');
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message;
      setErro(msg || 'Erro ao criar agendamento. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-5 my-8"
    >
      <h2 className="text-2xl font-semibold text-center">Solicitar Agendamento</h2>

      {voluntario && (
        <p className="text-center text-gray-600">
          Voluntário: <span className="font-semibold text-green-700">{voluntario.perfil.nome}</span>
        </p>
      )}

      {erro && <Alert severity="error">{erro}</Alert>}

      <TextField
        label="Título (opcional)"
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        size="small"
        fullWidth
        color="success"
      />

      <TextField
        label="Data e hora de início"
        name="dataInicio"
        type="datetime-local"
        value={form.dataInicio}
        onChange={handleChange}
        required
        size="small"
        InputLabelProps={{ shrink: true }}
        fullWidth
        color="success"
      />

      {servicos.length > 0 && (
        <TextField
          select
          label="Serviço (opcional)"
          name="servicoId"
          value={form.servicoId}
          onChange={handleChange}
          size="small"
          fullWidth
          color="success"
        >
          <MenuItem value="">Nenhum</MenuItem>
          {servicos.map(s => (
            <MenuItem key={s.id} value={String(s.id)}>{s.nome}</MenuItem>
          ))}
        </TextField>
      )}

      <TextField
        label="Local (opcional)"
        name="local"
        value={form.local}
        onChange={handleChange}
        size="small"
        fullWidth
        color="success"
      />

      <TextField
        label="Descrição (opcional)"
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
        multiline
        rows={3}
        size="small"
        fullWidth
        color="success"
      />

      <TextField
        label="Observações (opcional)"
        name="notas"
        value={form.notas}
        onChange={handleChange}
        multiline
        rows={3}
        size="small"
        fullWidth
        color="success"
      />

      <Button
        type="submit"
        color="success"
        variant="contained"
        fullWidth
        disabled={enviando || !clientePerfilId || !voluntario}
      >
        {enviando ? 'Enviando...' : 'Enviar Solicitação'}
      </Button>
    </form>
  );
}

export default function Page() {
  return (
    <Suspense>
      <SolicitarAgendamentoForm />
    </Suspense>
  );
}
