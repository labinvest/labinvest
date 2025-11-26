"use client";
import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CommentIcon from '@mui/icons-material/Comment';

export default function FAQ() {
  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    mensagem: Yup.string().required("Mensagem é obrigatória")
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      mensagem: ""
    },
    validationSchema,
    onSubmit: (values) => {
      // abrir modal de confirmação com os dados
      setSubmittedData(values);
      setOpenDialog(true);
    }
  });

  const faqs = [
    {
      pergunta: "Como me inscrevo?",
      resposta: "Você pode se inscrever clicando no botão de cadastro no topo da página e seguindo os passos.",
    },
    {
      pergunta: "Qual o prazo para resposta?",
      resposta: "Normalmente respondemos em até 48 horas úteis.",
    },
    {
      pergunta: "Posso alterar meus dados depois de enviado?",
      resposta: "Sim, entre em contato com o suporte e solicite a alteração dos seus dados.",
    },
  ];

  const handleConfirmSend = () => {
    if (!submittedData) return;
    // aqui você enviaria para a API. Por enquanto apenas log e feedback.
    console.log('Enviando mensagem:', submittedData);
    setOpenDialog(false);
    formik.resetForm();
    setSubmittedData(null);
    setOpenSnackbar(true);
  };

  const handleCancelSend = () => {
    setOpenDialog(false);
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Perguntas <span className="text-green-700">Frequentes</span>
          </h1>
          <p className="text-gray-600">
            Encontre respostas para as dúvidas mais comuns
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {faq.pergunta}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed ml-8">
                  {faq.resposta}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Envie sua Dúvida
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            
            

              <div>
                <TextField
                  name="nome"
                  label="Nome"
                  value={formik.values.nome}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Seu nome"
                  fullWidth
                  size="small"
                  color="success"
                  error={!!(formik.touched.nome && formik.errors.nome)}
                  helperText={formik.touched.nome && formik.errors.nome ? String(formik.errors.nome) : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="success" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="seu@email.com"
                  fullWidth
                  size="small"
                  color="success"
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email ? String(formik.errors.email) : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="success" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <TextField
                  name="mensagem"
                  label="Mensagem"
                  value={formik.values.mensagem}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Digite sua dúvida..."
                  fullWidth
                  size="small"
                  color="success"
                  multiline
                  rows={5}
                  error={!!(formik.touched.mensagem && formik.errors.mensagem)}
                  helperText={formik.touched.mensagem && formik.errors.mensagem ? String(formik.errors.mensagem) : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CommentIcon color="success" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                size="large"
              >
                Enviar
              </Button>
            </form>

            <Dialog open={openDialog} onClose={handleCancelSend}>
              <DialogTitle>Confirmar envio</DialogTitle>
              <DialogContent>
                  <Typography variant="body2" color="text.secondary">
                    Confirma o envio da seguinte mensagem?
                  </Typography>
                {submittedData && (
                  <div className="mt-4">
                    <p><strong>Nome:</strong> {submittedData.nome}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Mensagem:</strong></p>
                    <p className="whitespace-pre-wrap">{submittedData.mensagem}</p>
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelSend}>Cancelar</Button>
                <Button onClick={handleConfirmSend} variant="contained" color="success">Confirmar</Button>
              </DialogActions>
            </Dialog>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
              <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                Mensagem enviada com sucesso.
              </Alert>
            </Snackbar>
          </div>
          </div>
        </div>
  );
}