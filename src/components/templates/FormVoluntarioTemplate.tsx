'use client';

import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Divider } from '@mui/material';
import CheckboxCertificado from '../CheckboxCertificado';
import UploadImagem from '../UploadImagem';
import ProfissoesFinanceiras from '../ProfissioesVoluntarios';
import SuccessModal from '../Modal';
import { validationSchema } from '@/schemas/validationSchema';
import { fetchAPI } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function FormVoluntarioTemplate() {
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: 'Sucesso!', message: '' });

    const formik = useFormik({
        initialValues: {
            nome: '',
            sobrenome: '',
            email: '',
            senha: '',
            telefone: '',
            cpf: '',
            cnpj: '',
            profissao: '',
            curso: '',
            instituicao: '',
            anoConclusao: new Date().getFullYear(),
            areaInteresse: '',
            certificados: [] as string[],
        },
        enableReinitialize: true,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                if (editMode) {
                    // Atualiza perfil (nome, telefone)
                    await fetchAPI('/perfil/meu', {
                        method: 'PUT',
                        body: {
                            nome: `${values.nome} ${values.sobrenome}`.trim(),
                            telefone: values.telefone,
                        },
                    });

                    // Atualiza dados do voluntário (formacao, bio)
                    await fetchAPI('/voluntarios/me', {
                        method: 'PUT',
                        body: {
                            formacao: values.profissao,
                            bio: values.areaInteresse,
                        },
                    });

                    setModalConfig({ title: 'Sucesso!', message: 'Perfil de voluntário atualizado com sucesso.' });
                } else {
                    // Cadastro novo
                    const nomeCompleto = `${values.nome} ${values.sobrenome}`.trim();
                    const data = await fetchAPI('/auth/signup', {
                        method: 'POST',
                        body: {
                            nome: nomeCompleto,
                            email: values.email,
                            senha: values.senha,
                            telefone: values.telefone,
                            cpf: values.cpf,
                            role: 'VOLUNTARIO',
                        },
                    });

                    const token = data?.dados?.token;
                    const perfilId = data?.dados?.usuario?.perfil?.id;
                    if (token) localStorage.setItem('token', token);

                    if (perfilId) {
                        await fetchAPI('/voluntarios', {
                            method: 'POST',
                            body: { perfilId },
                        });
                    }

                    setModalConfig({ title: 'Sucesso!', message: 'Cadastro de voluntário realizado com sucesso.' });
                }

                setOpenDialog(true);
            } catch (error: unknown) {
                const msg = error instanceof Error ? error.message : 'Erro ao processar requisição.';
                setModalConfig({ title: 'Erro', message: msg });
                setOpenDialog(true);
            }
        },
    });

    // Detecta se o usuário logado é voluntário e carrega seus dados
    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) { setLoading(false); return; }

        async function carregarDados() {
            try {
                // 1. Busca dados do usuário autenticado
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const authRes: any = await fetchAPI('/auth/perfil');
                const user = authRes?.dados;

                if (!user) { setLoading(false); return; }

                // 2. Tenta buscar o registro de voluntário (pode não existir ainda)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let vol: any = null;
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const volRes: any = await fetchAPI('/voluntarios/me');
                    vol = volRes?.dados ?? volRes;
                } catch {
                    // Usuário tem role VOLUNTARIO mas sem registro Voluntario ainda
                }

                const nomeCompleto: string = user.perfil?.nome || '';
                const partes = nomeCompleto.trim().split(' ');
                const nome = partes[0] || '';
                const sobrenome = partes.slice(1).join(' ') || '';

                setEditMode(true);
                formik.setValues({
                    nome,
                    sobrenome,
                    email: user.email || '',
                    senha: '',
                    telefone: user.perfil?.telefone || '',
                    cpf: user.perfil?.cpf || '',
                    cnpj: '',
                    profissao: vol?.formacao || '',
                    curso: '',
                    instituicao: '',
                    anoConclusao: new Date().getFullYear(),
                    areaInteresse: vol?.bio || '',
                    certificados: [],
                });
            } catch {
                // Sem token válido ou usuário não autenticado → modo cadastro
            } finally {
                setLoading(false);
            }
        }

        carregarDados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        if (modalConfig.title === 'Sucesso!') {
            if (editMode) router.push('/voluntario/painel');
            else formik.resetForm();
        }
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">Carregando...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-8"
            >
                <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: 'grey.800', mb: 2 }}>
                    {editMode ? 'Editar Perfil de Voluntário' : 'Cadastro de Voluntário'}
                </Typography>
                <Typography variant="body2" align="center" sx={{ color: 'grey.600', mb: 4 }}>
                    {editMode
                        ? 'Atualize suas informações como voluntário'
                        : 'Preencha seus dados para se tornar um voluntário'}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Dados Pessoais */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'grey.700' }}>
                        Dados Pessoais
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        <TextField
                            label="Nome"
                            {...formik.getFieldProps('nome')}
                            error={formik.touched.nome && !!formik.errors.nome}
                            helperText={formik.touched.nome && formik.errors.nome}
                            size="small" fullWidth color="success" required
                        />
                        <TextField
                            label="Sobrenome"
                            {...formik.getFieldProps('sobrenome')}
                            error={formik.touched.sobrenome && !!formik.errors.sobrenome}
                            helperText={formik.touched.sobrenome && formik.errors.sobrenome}
                            size="small" fullWidth color="success" required
                        />

                        {/* Email — somente leitura em edição */}
                        <TextField
                            label="Email"
                            type="email"
                            {...formik.getFieldProps('email')}
                            error={formik.touched.email && !!formik.errors.email}
                            helperText={formik.touched.email && formik.errors.email}
                            size="small" fullWidth color="success" required={!editMode}
                            InputProps={{ readOnly: editMode }}
                            sx={{ bgcolor: editMode ? 'grey.100' : undefined }}
                        />

                        {/* Senha — oculta em edição */}
                        {!editMode && (
                            <TextField
                                label="Senha"
                                type="password"
                                {...formik.getFieldProps('senha')}
                                error={formik.touched.senha && !!formik.errors.senha}
                                helperText={formik.touched.senha && formik.errors.senha}
                                size="small" fullWidth color="success" required
                            />
                        )}

                        <TextField
                            label="Telefone"
                            type="tel"
                            {...formik.getFieldProps('telefone')}
                            error={formik.touched.telefone && !!formik.errors.telefone}
                            helperText={formik.touched.telefone && formik.errors.telefone}
                            size="small" fullWidth color="success"
                            placeholder="(11) 98765-4321" required
                        />

                        {/* CPF — somente leitura em edição */}
                        <TextField
                            label="CPF"
                            {...formik.getFieldProps('cpf')}
                            error={formik.touched.cpf && !!formik.errors.cpf}
                            helperText={formik.touched.cpf && formik.errors.cpf}
                            size="small" fullWidth color="success"
                            placeholder="123.456.789-00" required={!editMode}
                            InputProps={{ readOnly: editMode }}
                            sx={{ bgcolor: editMode ? 'grey.100' : undefined }}
                        />

                        {!editMode && (
                            <TextField
                                label="CNPJ (opcional)"
                                {...formik.getFieldProps('cnpj')}
                                error={formik.touched.cnpj && !!formik.errors.cnpj}
                                helperText={formik.touched.cnpj && formik.errors.cnpj}
                                size="small" fullWidth color="success"
                                placeholder="12.345.678/0001-00"
                            />
                        )}
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Formação e Profissão */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'grey.700' }}>
                        Formação e Profissão
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        <Box>
                            <ProfissoesFinanceiras
                                value={formik.values.profissao}
                                onChange={(profissao) => formik.setFieldValue('profissao', profissao)}
                            />
                            {formik.touched.profissao && formik.errors.profissao && (
                                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5, ml: 1.5 }}>
                                    {formik.errors.profissao}
                                </Typography>
                            )}
                        </Box>
                        <TextField
                            label="Curso"
                            {...formik.getFieldProps('curso')}
                            error={formik.touched.curso && !!formik.errors.curso}
                            helperText={formik.touched.curso && formik.errors.curso}
                            size="small" fullWidth color="success" required={!editMode}
                        />
                        <TextField
                            label="Instituição"
                            {...formik.getFieldProps('instituicao')}
                            error={formik.touched.instituicao && !!formik.errors.instituicao}
                            helperText={formik.touched.instituicao && formik.errors.instituicao}
                            size="small" fullWidth color="success" required={!editMode}
                        />
                        <TextField
                            label="Ano de Conclusão"
                            type="number"
                            {...formik.getFieldProps('anoConclusao')}
                            error={formik.touched.anoConclusao && !!formik.errors.anoConclusao}
                            helperText={formik.touched.anoConclusao && formik.errors.anoConclusao}
                            size="small" fullWidth color="success" required={!editMode}
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Interesses e Certificações */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'grey.700' }}>
                        Interesses e Bio
                    </Typography>
                    <TextField
                        label={editMode ? 'Bio / Descrição profissional' : 'Área de Interesse'}
                        {...formik.getFieldProps('areaInteresse')}
                        error={formik.touched.areaInteresse && !!formik.errors.areaInteresse}
                        helperText={formik.touched.areaInteresse && formik.errors.areaInteresse}
                        size="small" fullWidth color="success" multiline minRows={3}
                        sx={{ mb: 3 }} required
                    />
                    {!editMode && (
                        <>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                                Certificados *
                            </Typography>
                            <CheckboxCertificado
                                selected={formik.values.certificados}
                                onChange={(certificados) => formik.setFieldValue('certificados', certificados)}
                            />
                            {formik.touched.certificados && formik.errors.certificados && (
                                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1, ml: 1.5 }}>
                                    {formik.errors.certificados}
                                </Typography>
                            )}
                        </>
                    )}
                </Box>

                {!editMode && (
                    <>
                        <Divider sx={{ my: 3 }} />
                        <Box>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'grey.700' }}>
                                Foto de Perfil
                            </Typography>
                            <UploadImagem />
                        </Box>
                    </>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, pt: 3 }}>
                    {editMode && (
                        <Button
                            variant="outlined" color="inherit" size="large"
                            onClick={() => router.push('/voluntario/painel')}
                            sx={{ minWidth: 140, textTransform: 'none' }}
                        >
                            Cancelar
                        </Button>
                    )}
                    <Button
                        type="submit" variant="contained" color="success" size="large"
                        sx={{ minWidth: 200, py: 1.5, fontSize: '1rem', fontWeight: 600, textTransform: 'none' }}
                    >
                        {editMode ? 'Salvar Alterações' : 'Cadastrar Voluntário'}
                    </Button>
                </Box>
            </form>

            <SuccessModal
                open={openDialog}
                onClose={handleCloseDialog}
                title={modalConfig.title}
                message={modalConfig.message}
                buttonText="Fechar"
            />
        </Box>
    );
}
