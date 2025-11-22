'use client';

import { useFormik } from 'formik';
import { useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import CheckboxCertificado from '../CheckboxCertificado';
import UploadImagem from '../UploadImagem';
import ProfissoesFinanceiras from '../ProfissioesVoluntarios';
import { validationSchema } from '@/schemas/validationSchema';

export default function FormVoluntarioTemplate() {

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
        onSubmit: (values) => {
            console.log('Dados enviados:', values);
            localStorage.setItem('cadastroVoluntario', JSON.stringify(values));
        },
    });

    useEffect(() => {
        const dadosSalvos = localStorage.getItem('cadastroVoluntario');
        if (dadosSalvos) {
            formik.setValues(JSON.parse(dadosSalvos));
        }
    }, []);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-10"
        >
            <Typography variant="h5" align="center">
                Cadastro de Voluntário
            </Typography>

            <section className="space-y-4">
                <Typography variant="h6">Dados Pessoais</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField label="Nome" {...formik.getFieldProps('nome')} error={!!formik.errors.nome && formik.touched.nome} helperText={formik.touched.nome && formik.errors.nome} size="small" fullWidth color="success" />
                    <TextField label="Sobrenome" {...formik.getFieldProps('sobrenome')} error={!!formik.errors.sobrenome && formik.touched.sobrenome} helperText={formik.touched.sobrenome && formik.errors.sobrenome} size="small" fullWidth color="success" />
                    <TextField label="Email" type="email" {...formik.getFieldProps('email')} error={!!formik.errors.email && formik.touched.email} helperText={formik.touched.email && formik.errors.email} size="small" fullWidth color="success" />
                    <TextField label="Telefone" type="tel" {...formik.getFieldProps('telefone')} error={!!formik.errors.telefone && formik.touched.telefone} helperText={formik.touched.telefone && formik.errors.telefone} size="small" fullWidth color="success" />
                    <TextField label="CPF" {...formik.getFieldProps('cpf')} error={!!formik.errors.cpf && formik.touched.cpf} helperText={formik.touched.cpf && formik.errors.cpf} size="small" fullWidth color="success" />
                    <TextField label="CNPJ" {...formik.getFieldProps('cnpj')} size="small" fullWidth color="success" />
                </div>
            </section>

            <section className="space-y-4">
                <Typography variant="h6">Formação e Profissão</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <ProfissoesFinanceiras
                            value={formik.values.profissao}
                            onChange={(profissao) => formik.setFieldValue('profissao', profissao)}
                        />
                        {formik.touched.profissao && formik.errors.profissao && (
                            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
                                {formik.errors.profissao}
                            </Typography>
                        )}
                    </div>
                    <div>
                        <TextField label="Curso" {...formik.getFieldProps('curso')} error={!!formik.errors.curso && formik.touched.curso} helperText={formik.touched.curso && formik.errors.curso} size="small" fullWidth color="success" />
                    </div>
                    <div>
                        <TextField label="Instituição" {...formik.getFieldProps('instituicao')} error={!!formik.errors.instituicao && formik.touched.instituicao} helperText={formik.touched.instituicao && formik.errors.instituicao} size="small" fullWidth color="success" />
                    </div>
                    <div>
                        <TextField label="Ano de Conclusão" type="number" {...formik.getFieldProps('anoConclusao')} error={!!formik.errors.anoConclusao && formik.touched.anoConclusao} helperText={formik.touched.anoConclusao && formik.errors.anoConclusao} size="small" fullWidth color="success" />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <Typography variant="h6">Interesses e Certificações</Typography>
                <TextField label="Área de Interesse" {...formik.getFieldProps('areaInteresse')} size="small" fullWidth color="success" />
                <Typography variant="subtitle1">Certificados</Typography>
                <CheckboxCertificado
                    selected={formik.values.certificados}
                    onChange={(certificados) => formik.setFieldValue('certificados', certificados)}
                />
                {formik.touched.certificados && formik.errors.certificados && (
                    <Typography variant="caption" color="error">
                        {formik.errors.certificados}
                    </Typography>
                )}
            </section>

            <section className="space-y-4">
                <Typography variant="h6">Imagem</Typography>
                <UploadImagem />
            </section>

            <div className="flex justify-center">
                <Button type="submit" variant="contained" color="success">
                    Enviar
                </Button>
            </div>
        </form>
    );
}
