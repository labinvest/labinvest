'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Button, TextField, Typography, Box, Divider, Select, MenuItem, FormControl, InputLabel, OutlinedInput, Checkbox, ListItemText } from '@mui/material';
import SuccessModal from '../Modal';
import { fetchAPI } from '@/services/api';
import uploadService from '@/services/uploadService';
import * as Yup from 'yup';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

type Categoria = {
  id: number;
  nome: string;
};

type TipoDocumento = {
  id: number;
  nome: string;
  obrigatorio?: boolean;
};

const formacoes = [
  { value: 'ENSINO_MEDIO', label: 'Ensino Médio' },
  { value: 'TECNICO', label: 'Técnico' },
  { value: 'GRADUACAO_EM_ANDAMENTO', label: 'Graduação em andamento' },
  { value: 'GRADUACAO_CONCLUIDA', label: 'Graduação concluída' },
  { value: 'POS_GRADUACAO', label: 'Pós-graduação' },
  { value: 'MESTRADO', label: 'Mestrado' },
  { value: 'DOUTORADO', label: 'Doutorado' },
];

const volunteerSchema = Yup.object({
  nome: Yup.string().min(3, 'Mínimo 3 caracteres').required('Obrigatório'),
  email: Yup.string().email('Email inválido').required('Obrigatório'),
  senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Obrigatório'),
  telefone: Yup.string()
    .required('Obrigatório')
    .test('telefone-valido', 'Telefone inválido (ex: (11) 98765-4321)', (value) => {
      if (!value) return false;
      const numeros = value.replace(/\D/g, '');
      return numeros.length === 10 || numeros.length === 11;
    }),
  cpf: Yup.string()
    .required('Obrigatório')
    .test('cpf-valido', 'CPF inválido', (value) => {
      if (!value) return false;
      return cpfValidator.isValid(value);
    }),
  categoriaId: Yup.string().required('Obrigatório'),
  formacao: Yup.string().required('Obrigatório'),
  experiencia: Yup.number()
    .typeError('Informe um número')
    .min(0, 'Não pode ser negativo')
    .required('Obrigatório'),
  bio: Yup.string().min(10, 'Descreva melhor sua experiência').required('Obrigatório'),
  documentos: Yup.array().of(Yup.string()).min(1, 'Selecione pelo menos um documento'),
});

export default function FormVoluntarioTemplate() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: 'Sucesso!', message: 'Cadastro realizado com sucesso.' });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [anexos, setAnexos] = useState<Record<string, { url: string; nomeArquivo: string }>>({});
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);
  const [carregandoDocumentos, setCarregandoDocumentos] = useState(true);

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const response = await fetchAPI('/categorias?ativo=true&limit=100');
        const lista = response?.categorias || response?.dados?.categorias || response?.dados || [];
        setCategorias(Array.isArray(lista) ? lista : []);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        setCategorias([]);
      } finally {
        setCarregandoCategorias(false);
      }
    };

    loadCategorias();
  }, []);

  useEffect(() => {
    const loadTiposDocumento = async () => {
      try {
        const response = await fetchAPI('/tipos-documento?ativo=true');
        const lista = response?.dados || response || [];
        setTiposDocumento(Array.isArray(lista) ? lista : []);
      } catch (error) {
        console.error('Erro ao carregar tipos de documento:', error);
        setTiposDocumento([]);
      } finally {
        setCarregandoDocumentos(false);
      }
    };

    loadTiposDocumento();
  }, []);

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      cpf: '',
      categoriaId: '',
      formacao: '',
      experiencia: '',
      bio: '',
      documentos: [] as string[],
    },
    validationSchema: volunteerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const documentosSemAnexo = values.documentos.filter((tipoDocumentoId) => !anexos[tipoDocumentoId]);
        if (documentosSemAnexo.length > 0) {
          throw new Error('Anexe um PDF para cada documento selecionado.');
        }

        const data = await fetchAPI('/auth/signup', {
          method: 'POST',
          body: {
            nome: values.nome,
            email: values.email,
            senha: values.senha,
            telefone: values.telefone,
            cpf: values.cpf,
            role: 'CLIENTE',
          },
        });

        const token = data?.dados?.token;
        if (token) localStorage.setItem('token', token);

        await fetchAPI('/solicitacoes-voluntario', {
          method: 'POST',
          body: {
            categoriaId: values.categoriaId,
            formacao: values.formacao,
            bio: values.bio,
            experiencia: values.experiencia,
            documentos: values.documentos.map((tipoDocumentoId) => {
              const tipoDocumento = tiposDocumento.find((item) => String(item.id) === tipoDocumentoId);
              const anexo = anexos[tipoDocumentoId];

              return {
                tipoDocumentoId: Number(tipoDocumentoId),
                nome: tipoDocumento?.nome || '',
                caminhoArquivo: anexo.url,
                nomeArquivo: anexo.nomeArquivo,
              };
            }),
          },
        });

        setModalConfig({ title: 'Sucesso!', message: 'Seu cadastro de voluntário foi enviado para análise.' });
        setOpenDialog(true);
      } catch (error) {
        console.error('Erro ao cadastrar voluntário:', error);
        setModalConfig({ title: 'Erro', message: 'Erro ao cadastrar voluntário.' });
        setOpenDialog(true);
      }
    },
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm();
    router.push('/voluntario/solicitar');
  };

  const handleDocumentoUpload = async (tipoDocumentoId: string, file: File) => {
    const response = await uploadService.uploadImagem(file);
    const url = response?.url;

    if (!url) {
      throw new Error('Não foi possível enviar o arquivo');
    }

    setAnexos((current) => ({
      ...current,
      [tipoDocumentoId]: {
        url,
        nomeArquivo: file.name,
      },
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4, px: 2 }}>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-8"
      >
        <Box>
          <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: 'grey.800', mb: 1 }}>
            Cadastro de Voluntário
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: 'grey.600' }}>
            Preencha seus dados e envie sua solicitação. Depois do cadastro, a equipe vai analisar o seu perfil.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'grey.700' }}>
            Dados de acesso
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Nome completo"
              {...formik.getFieldProps('nome')}
              error={formik.touched.nome && !!formik.errors.nome}
              helperText={formik.touched.nome && formik.errors.nome}
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
              label="Senha"
              type="password"
              {...formik.getFieldProps('senha')}
              error={formik.touched.senha && !!formik.errors.senha}
              helperText={formik.touched.senha && formik.errors.senha}
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
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'grey.700' }}>
            Informações de voluntariado
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <FormControl size="small" fullWidth color="success" error={formik.touched.categoriaId && !!formik.errors.categoriaId}>
              <InputLabel>Categoria</InputLabel>
              <Select
                label="Categoria"
                {...formik.getFieldProps('categoriaId')}
                value={formik.values.categoriaId}
                disabled={carregandoCategorias}
              >
                <MenuItem value="">{carregandoCategorias ? 'Carregando...' : 'Selecione uma categoria'}</MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={String(categoria.id)}>
                    {categoria.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Experiência (anos)"
              type="number"
              {...formik.getFieldProps('experiencia')}
              error={formik.touched.experiencia && !!formik.errors.experiencia}
              helperText={formik.touched.experiencia && formik.errors.experiencia}
              size="small"
              fullWidth
              color="success"
              required
            />
            <FormControl size="small" fullWidth color="success" error={formik.touched.documentos && !!formik.errors.documentos}>
              <InputLabel>Documentos</InputLabel>
              <Select
                multiple
                label="Documentos"
                value={formik.values.documentos}
                input={<OutlinedInput label="Documentos" />}
                renderValue={(selected) =>
                  (selected as string[])
                    .map((tipoDocumentoId) => tiposDocumento.find((item) => String(item.id) === tipoDocumentoId)?.nome || tipoDocumentoId)
                    .join(', ')
                }
                disabled={carregandoDocumentos}
                onChange={(event) => {
                  const value = event.target.value;
                  formik.setFieldValue('documentos', typeof value === 'string' ? value.split(',') : value);
                }}
              >
                <MenuItem value="" disabled>
                  {carregandoDocumentos ? 'Carregando...' : 'Selecione os documentos'}
                </MenuItem>
                {tiposDocumento.map((documento) => (
                  <MenuItem key={documento.id} value={documento.nome}>
                    <Checkbox checked={formik.values.documentos.indexOf(documento.nome) > -1} />
                    <ListItemText primary={documento.nome} secondary={documento.obrigatorio ? 'Obrigatório' : undefined} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'grey.700', fontWeight: 600 }}>
              Escolha uma formação
            </Typography>
            <FormControl size="small" fullWidth color="success" error={formik.touched.formacao && !!formik.errors.formacao}>
              <InputLabel>Formação</InputLabel>
              <Select label="Formação" {...formik.getFieldProps('formacao')} value={formik.values.formacao}>
                <MenuItem value="">Selecione uma formação</MenuItem>
                {formacoes.map((formacao) => (
                  <MenuItem key={formacao.value} value={formacao.value}>
                    {formacao.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'grey.700' }}>
              Anexar PDFs
            </Typography>
            {formik.values.documentos.length === 0 ? (
              <Typography variant="body2" sx={{ color: 'grey.500' }}>
                Selecione pelo menos um documento acima para liberar o anexo do PDF.
              </Typography>
            ) : (
              <Box sx={{ display: 'grid', gap: 2 }}>
                {formik.values.documentos.map((tipoDocumentoId) => {
                  const tipoDocumento = tiposDocumento.find((item) => String(item.id) === tipoDocumentoId);
                  const anexo = anexos[tipoDocumentoId];

                  return (
                    <Box key={tipoDocumentoId} className="rounded-xl border border-slate-200 p-4 bg-slate-50 flex flex-col gap-2">
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'grey.800' }}>
                        {tipoDocumento?.nome || 'Documento'}
                      </Typography>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button variant="outlined" color="success" component="label" size="small">
                          {anexo ? 'Trocar PDF' : 'Anexar PDF'}
                          <input
                            type="file"
                            hidden
                            accept="application/pdf"
                            onChange={async (event) => {
                              const file = event.target.files?.[0];
                              if (!file) return;
                              try {
                                await handleDocumentoUpload(tipoDocumentoId, file);
                              } catch (error) {
                                console.error('Erro ao anexar PDF:', error);
                                setModalConfig({ title: 'Erro', message: 'Não foi possível anexar o PDF selecionado.' });
                                setOpenDialog(true);
                              }
                            }}
                          />
                        </Button>
                        <Typography variant="body2" sx={{ color: anexo ? 'success.main' : 'grey.500' }}>
                          {anexo ? anexo.nomeArquivo : 'Nenhum PDF enviado ainda'}
                        </Typography>
                      </div>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
          <TextField
            label="Bio / apresentação"
            {...formik.getFieldProps('bio')}
            error={formik.touched.bio && !!formik.errors.bio}
            helperText={formik.touched.bio && formik.errors.bio}
            multiline
            rows={4}
            size="small"
            fullWidth
            color="success"
            sx={{ mt: 3 }}
            required
          />
        </Box>

        <Button variant="contained" color="success" type="submit" fullWidth>
          Enviar solicitação de voluntário
        </Button>
      </form>

      <SuccessModal
        open={openDialog}
        onClose={handleCloseDialog}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </Box>
  );
}
