'use client';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

interface SolicitarAgendamento {
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    telefone: number;
    profissao: string;
    dataPreferida: string;
    shrink: true;
}

export default function SolicitarAgendamentoForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
        >
            <h2 className="text-2xl font-semibold text-center mb-6">Solicitar Agendamento</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 disp">
                <TextField
                    label="Nome"
                    type="text"
                    name="nome"
                    required
                    size="small"
                    fullWidth
                    color="success"
                />

                <TextField
                    label="Sobrenome"
                    type="text"
                    name="sobrenome"
                    required
                    size="small"
                    fullWidth
                    color="success"
                />

                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    required
                    size="small"
                    fullWidth
                    color="success"
                />

                <TextField
                    label="CPF"
                    type="text"
                    name="cpf"
                    required
                    size="small"
                    fullWidth
                    color="success"
                />

                <TextField
                    label="Telefone"
                    type="tel"
                    name="telefone"
                    required
                    size="small"
                    fullWidth
                    color="success"
                />

                <TextField
                    label="Profissão"
                    type="text"
                    name="profissao"
                    required
                    size="small"
                    fullWidth
                    color="success"
                />
            </div>
            <div>
                <TextField
                    label="Data preferida"
                    type="date"
                    name="dataPreferida"
                    required
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    color="success"
                />
            </div>
            <div>
                <TextField
                    label="Comentários adicionais"
                    type="text"
                    name="comentarios"
                    multiline
                    rows={4}
                    size="small"
                    fullWidth
                    className="mt-4"
                    color="success"
                />
            </div>

            <Button
                type="submit"
                color='success'
                variant='contained'
                fullWidth
            >
                Enviar Solicitação
            </Button>
        </form>

    );
}