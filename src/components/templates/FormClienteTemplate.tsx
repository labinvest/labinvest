'use client';

import { clienteSchema } from "@/schemas/clienteSchema";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/Modal";
import { fetchAPI } from "@/services/api";

interface Cliente {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    cpf: string;
    dataNascimento: string;
    estadoCivil: string;
    profissao: string;
    rendaMensal: string;
    cep: string;
    cidade: string;
    estado: string;
    objetivoFinanceiro: string;
    comoConheceu: string;
    descricao: string;
    imagemUrl?: string;
}

interface FormClienteTemplateProps {
    cliente?: Cliente;
}

export default function FormClienteTemplate({ cliente: clienteProp }: FormClienteTemplateProps) {
    const router = useRouter();
    const [imagemPreview, setImagemPreview] = useState<string | null>(null);
    const [cliente, setCliente] = useState<Cliente | undefined>(clienteProp);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '' });

    useEffect(() => {
        if (clienteProp) return;

        fetchAPI('/auth/perfil')
            .then((data: any) => {
                const perfil = data?.dados?.perfil || data?.dados?.usuario?.perfil;
                if (!perfil) return;

                const nomeCompleto = perfil.nome || '';
                const [nome, ...resto] = nomeCompleto.trim().split(' ');
                const sobrenome = resto.join(' ');

                setCliente({
                    id: String(perfil.id || ''),
                    nome: nome || '',
                    sobrenome: sobrenome || '',
                    email: data?.dados?.email || '',
                    telefone: perfil.telefone || '',
                    cpf: perfil.cpf || '',
                    dataNascimento: '',
                    estadoCivil: '',
                    profissao: '',
                    rendaMensal: '',
                    cep: '',
                    cidade: '',
                    estado: '',
                    objetivoFinanceiro: '',
                    comoConheceu: '',
                    descricao: '',
                });
            })
            .catch(() => {
                // usuário não autenticado — mantém formulário vazio para cadastro
            });
    }, [clienteProp]);

    const formik = useFormik({
        initialValues: {
            nome: cliente?.nome || '',
            sobrenome: cliente?.sobrenome || '',
            email: cliente?.email || '',
            telefone: cliente?.telefone || '',
            cpf: cliente?.cpf || '',
            senha: '',
            dataNascimento: cliente?.dataNascimento || '',
            estadoCivil: cliente?.estadoCivil || '',
            profissao: cliente?.profissao || '',
            rendaMensal: cliente?.rendaMensal || '',
            cep: cliente?.cep || '',
            cidade: cliente?.cidade || '',
            estado: cliente?.estado || '',
            objetivoFinanceiro: cliente?.objetivoFinanceiro || '',
            comoConheceu: cliente?.comoConheceu || '',
            descricao: cliente?.descricao || '',
        },
        enableReinitialize: true,
        validationSchema: clienteSchema,
        onSubmit: async (values) => {
            try {
                if (cliente?.id) {
                    const nomeCompleto = `${values.nome} ${values.sobrenome}`.trim();
                    await fetchAPI('/auth/perfil', {
                        method: 'PUT',
                        body: {
                            nome: nomeCompleto,
                            telefone: values.telefone,
                            endereco: `${values.cidade} - ${values.estado}`.trim(),
                        },
                    });

                    setModalConfig({ title: 'Sucesso!', message: 'Cliente atualizado com sucesso!' });
                    setModalOpen(true);
                } else {
                    const nomeCompleto = `${values.nome} ${values.sobrenome}`.trim();
                    const data = await fetchAPI('/auth/signup', {
                        method: 'POST',
                        body: {
                            nome: nomeCompleto,
                            email: values.email,
                            senha: values.senha,
                            telefone: values.telefone,
                            endereco: `${values.cidade} - ${values.estado}`.trim(),
                            cpf: values.cpf,
                            role: 'CLIENTE',
                        },
                    });

                    const token = data?.dados?.token;
                    if (token) localStorage.setItem('token', token);

                    setModalConfig({ title: 'Sucesso!', message: 'Cliente cadastrado com sucesso!' });
                    setModalOpen(true);
                }
            } catch (error) {
                console.error(error);
                setModalConfig({ title: 'Erro', message: 'Erro ao processar requisição' });
                setModalOpen(true);
            }
        },
    });

    const handleImagemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagemPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (cliente?.imagemUrl) {
            setImagemPreview(cliente.imagemUrl);
        }
    }, [cliente]);

    const { handleSubmit, handleChange, values, errors } = formik;

    
    return (
        <div className="flex flex-col space-y-4  w-[50%] max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {cliente?.id ? 'Editar Perfil' : ''}
                </h1>
                <div className="flex flex-col items-center mb-6">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-3 border-4 border-green-600">
                        {imagemPreview ? (
                            <img src={imagemPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <FontAwesomeIcon icon={faCamera} className="text-gray-400 text-4xl" />
                        )}
                    </div>
                    <Button
                        variant="outlined"
                        color="success"
                        component="label"
                        size="small"
                    >
                        Selecionar Foto
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImagemChange}
                        />
                    </Button>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            name="nome"
                            label="Nome"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.nome}
                            onChange={handleChange}
                            error={formik.touched.nome && !!errors.nome}
                            helperText={formik.touched.nome && formik.errors.nome}
                        />
                        <TextField
                            name="sobrenome"
                            label="Sobrenome"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.sobrenome}
                            onChange={handleChange}
                            error={formik.touched.sobrenome && !!errors.sobrenome}
                            helperText={formik.touched.sobrenome && formik.errors.sobrenome}
                        />
                        <TextField
                            name="cpf"
                            label="CPF"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.cpf}
                            onChange={handleChange}
                            placeholder="XXX.XXX.XXX-XX"
                            error={formik.touched.cpf && !!errors.cpf}
                            helperText={formik.touched.cpf && formik.errors.cpf}
                        />
                        <TextField
                            name="senha"
                            label="Senha"
                            type="password"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.senha}
                            onChange={handleChange}
                            error={formik.touched.senha && !!errors.senha}
                            helperText={formik.touched.senha && formik.errors.senha}
                        />
                        <TextField
                            name="dataNascimento"
                            label="Data de Nascimento"
                            type="date"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.dataNascimento}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            error={formik.touched.dataNascimento && !!errors.dataNascimento}
                            helperText={formik.touched.dataNascimento && formik.errors.dataNascimento}
                        />
                        <FormControl fullWidth size="small" color="success">
                            <InputLabel>Estado Civil</InputLabel>
                            <Select
                                name="estadoCivil"
                                label="Estado Civil"
                                value={values.estadoCivil}
                                onChange={handleChange}
                                error={formik.touched.estadoCivil && !!errors.estadoCivil}
                            >
                                <MenuItem value="solteiro">Solteiro(a)</MenuItem>
                                <MenuItem value="casado">Casado(a)</MenuItem>
                                <MenuItem value="divorciado">Divorciado(a)</MenuItem>
                                <MenuItem value="viuvo">Viúvo(a)</MenuItem>
                                <MenuItem value="uniao_estavel">União Estável</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contato</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.email}
                            onChange={handleChange}
                            error={formik.touched.email && !!errors.email}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            name="telefone"
                            label="Telefone"
                            type="tel"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.telefone}
                            onChange={handleChange}
                            placeholder="(XX) 9XXXX-XXXX"
                            error={formik.touched.telefone && !!errors.telefone}
                            helperText={formik.touched.telefone && formik.errors.telefone}
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Endereço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextField
                            name="cep"
                            label="CEP"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.cep}
                            onChange={handleChange}
                            placeholder="XXXXX-XXX"
                            error={formik.touched.cep && !!errors.cep}
                            helperText={formik.touched.cep && formik.errors.cep}
                        />
                        <TextField
                            name="cidade"
                            label="Cidade"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.cidade}
                            onChange={handleChange}
                            error={formik.touched.cidade && !!errors.cidade}
                            helperText={formik.touched.cidade && formik.errors.cidade}
                        />
                        <TextField
                            name="estado"
                            label="Estado (UF)"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.estado}
                            onChange={handleChange}
                            inputProps={{ maxLength: 2 }}
                            error={formik.touched.estado && !!errors.estado}
                            helperText={formik.touched.estado && formik.errors.estado}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Informações Profissionais e Financeiras</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            name="profissao"
                            label="Profissão"
                            size="small"
                            fullWidth
                            color="success"
                            value={values.profissao}
                            onChange={handleChange}
                            error={formik.touched.profissao && !!errors.profissao}
                            helperText={formik.touched.profissao && formik.errors.profissao}
                        />
                        <FormControl fullWidth size="small" color="success">
                            <InputLabel>Renda Mensal</InputLabel>
                            <Select
                                name="rendaMensal"
                                label="Renda Mensal"
                                value={values.rendaMensal}
                                onChange={handleChange}
                                error={formik.touched.rendaMensal && !!errors.rendaMensal}
                            >
                                <MenuItem value="ate_2000">Até R$ 2.000</MenuItem>
                                <MenuItem value="2000_5000">R$ 2.000 - R$ 5.000</MenuItem>
                                <MenuItem value="5000_10000">R$ 5.000 - R$ 10.000</MenuItem>
                                <MenuItem value="10000_20000">R$ 10.000 - R$ 20.000</MenuItem>
                                <MenuItem value="acima_20000">Acima de R$ 20.000</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small" color="success">
                            <InputLabel>Objetivo Financeiro</InputLabel>
                            <Select
                                name="objetivoFinanceiro"
                                label="Objetivo Financeiro"
                                value={values.objetivoFinanceiro}
                                onChange={handleChange}
                                error={formik.touched.objetivoFinanceiro && !!errors.objetivoFinanceiro}
                            >
                                <MenuItem value="economia">Economizar dinheiro</MenuItem>
                                <MenuItem value="investimento">Começar a investir</MenuItem>
                                <MenuItem value="dividas">Controlar dívidas</MenuItem>
                                <MenuItem value="aposentadoria">Planejamento de aposentadoria</MenuItem>
                                <MenuItem value="imovel">Comprar imóvel</MenuItem>
                                <MenuItem value="educacao">Educação financeira</MenuItem>
                                <MenuItem value="outros">Outros</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small" color="success">
                            <InputLabel>Como conheceu o Lab Invest?</InputLabel>
                            <Select
                                name="comoConheceu"
                                label="Como conheceu o Lab Invest?"
                                value={values.comoConheceu}
                                onChange={handleChange}
                                error={formik.touched.comoConheceu && !!errors.comoConheceu}
                            >
                                <MenuItem value="redes_sociais">Redes Sociais</MenuItem>
                                <MenuItem value="google">Pesquisa no Google</MenuItem>
                                <MenuItem value="indicacao">Indicação de amigos/familiares</MenuItem>
                                <MenuItem value="faculdade">Faculdade/Universidade</MenuItem>
                                <MenuItem value="evento">Evento/Palestra</MenuItem>
                                <MenuItem value="outros">Outros</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Sobre Você</h3>
                    <TextField
                        name="descricao"
                        label="Conte um pouco sobre sua situação financeira e expectativas"
                        multiline
                        rows={4}
                        size="small"
                        fullWidth
                        color="success"
                        value={values.descricao}
                        onChange={handleChange}
                        error={formik.touched.descricao && !!errors.descricao}
                        helperText={formik.touched.descricao && formik.errors.descricao}
                    />
                </div>

                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    fullWidth
                >
                    Salvar
                </Button>
            </form>
            
            <SuccessModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    if (modalConfig.title === 'Sucesso!') {
                        router.push('/home');
                    }
                }}
                title={modalConfig.title}
                message={modalConfig.message}
            />
        </div>
    )
}