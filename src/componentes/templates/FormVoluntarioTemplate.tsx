'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { TextField, Button, Typography, Box, Divider } from '@mui/material';
import CheckboxCertificado from '../CheckboxCertificado';
import UploadImagem from '../UploadImagem';
import ProfissoesFinanceiras from '../ProfissioesVoluntarios';
import SuccessModal from '../Modal';
import { validationSchema } from '@/schemas/validationSchema';

export default function FormVoluntarioTemplate() {
    const [openDialog, setOpenDialog] = useState(false);

    const formik = useFormik({
        initialValues: {
            nome: '',
            sobrenome: '',
            email: '',
            telefone: '',
            cpf: '',
            cnpj: '',
            profissao: '',
            curso: '',
            instituicao: '',
            anoConclusao: new Date().getFullYear(),
            areaInteresse: '',
            certificados: [],
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            console.log('Formulário enviado:', values);
            setOpenDialog(true);
        },
    });

    const handleCloseDialog = () => {
        setOpenDialog(false);
        formik.resetForm();
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-8"
            >
                <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: 'grey.800', mb: 2 }}>
                    Cadastro de Voluntário
                </Typography>
                <Typography variant="body2" align="center" sx={{ color: 'grey.600', mb: 4 }}>
                    Preencha seus dados para se tornar um voluntário
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
                            size="small"
                            fullWidth
                            color="success"
                            required
                        />
                        <TextField
                            label="Sobrenome"
                            {...formik.getFieldProps('sobrenome')}
                            error={formik.touched.sobrenome && !!formik.errors.sobrenome}
                            helperText={formik.touched.sobrenome && formik.errors.sobrenome}
                            size="small"
                            fullWidth
                            color="success"
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            {...formik.getFieldProps('email')}
                            error={formik.touched.email && !!formik.errors.email}
                            helperText={formik.touched.email && formik.errors.email}
                            size="small"
                            fullWidth
                            color="success"
                            required
                        />
                        <TextField
                            label="Telefone"
                            type="tel"
                            {...formik.getFieldProps('telefone')}
                            error={formik.touched.telefone && !!formik.errors.telefone}
                            helperText={formik.touched.telefone && formik.errors.telefone}
                            size="small"
                            fullWidth
                            color="success"
                            placeholder="(11) 98765-4321"
                            required
                        />
                        <TextField
                            label="CPF"
                            {...formik.getFieldProps('cpf')}
                            error={formik.touched.cpf && !!formik.errors.cpf}
                            helperText={formik.touched.cpf && formik.errors.cpf}
                            size="small"
                            fullWidth
                            color="success"
                            placeholder="123.456.789-00"
                            required
                        />
                        <TextField
                            label="CNPJ (opcional)"
                            {...formik.getFieldProps('cnpj')}
                            error={formik.touched.cnpj && !!formik.errors.cnpj}
                            helperText={formik.touched.cnpj && formik.errors.cnpj}
                            size="small"
                            fullWidth
                            color="success"
                            placeholder="12.345.678/0001-00"
                        />
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
                            size="small"
                            fullWidth
                            color="success"
                            required
                        />
                        <TextField
                            label="Instituição"
                            {...formik.getFieldProps('instituicao')}
                            error={formik.touched.instituicao && !!formik.errors.instituicao}
                            helperText={formik.touched.instituicao && formik.errors.instituicao}
                            size="small"
                            fullWidth
                            color="success"
                            required
                        />
                        <TextField
                            label="Ano de Conclusão"
                            type="number"
                            {...formik.getFieldProps('anoConclusao')}
                            error={formik.touched.anoConclusao && !!formik.errors.anoConclusao}
                            helperText={formik.touched.anoConclusao && formik.errors.anoConclusao}
                            size="small"
                            fullWidth
                            color="success"
                            required
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Interesses e Certificações */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'grey.700' }}>
                        Interesses e Certificações
                    </Typography>
                    <TextField
                        label="Área de Interesse"
                        {...formik.getFieldProps('areaInteresse')}
                        error={formik.touched.areaInteresse && !!formik.errors.areaInteresse}
                        helperText={formik.touched.areaInteresse && formik.errors.areaInteresse}
                        size="small"
                        fullWidth
                        color="success"
                        sx={{ mb: 3 }}
                        required
                    />
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
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Imagem */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'grey.700' }}>
                        Foto de Perfil
                    </Typography>
                    <UploadImagem />
                </Box>

                {/* Botão de Envio */}
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{
                            minWidth: 200,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: 2,
                            '&:hover': {
                                boxShadow: 4
                            }
                        }}
                    >
                        Cadastrar Voluntário
                    </Button>
                </Box>
            </form>

            <SuccessModal
                open={openDialog}
                onClose={handleCloseDialog}
                title="Cadastro Realizado!"
                message="Seus dados foram salvos com sucesso. Obrigado por se tornar um voluntário!"
                buttonText="Fechar"
            />
        </Box>
    );
}