"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetchAPI } from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faBriefcase } from "@fortawesome/free-solid-svg-icons";

type PerfilResponse = {
  id: number;
  email: string;
  role: string;
  perfil?: {
    id: number;
    nome?: string | null;
    telefone?: string | null;
    endereco?: string | null;
    cpf?: string | null;
  } | null;
};

type VoluntarioResponse = {
  id: number;
  bio?: string | null;
  formacao?: string | null;
  categoria?: { id: number; nome?: string | null } | null;
};

type FormValues = {
  nome: string;
  telefone: string;
  endereco: string;
  cpf: string;
  bio: string;
};

export default function EditarPerfil() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<PerfilResponse | null>(null);
  const [voluntario, setVoluntario] = useState<VoluntarioResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      nome: "",
      telefone: "",
      endereco: "",
      cpf: "",
      bio: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setSaving(true);
      setMessage(null);
      setError(null);

      try {
        const response = await fetchAPI('/perfil/meu', {
          method: 'PUT',
          body: values,
        });

        if (voluntario || perfil?.role?.toLowerCase() === 'voluntario') {
          await fetchAPI('/voluntarios/me', {
            method: 'PUT',
            body: {
              bio: values.bio,
            },
          });
        }

        const atualizado = response?.dados || response;
        setPerfil((prev) =>
          prev
            ? {
                ...prev,
                perfil: prev.perfil
                  ? {
                      ...prev.perfil,
                      nome: atualizado?.nome ?? values.nome,
                      telefone: atualizado?.telefone ?? values.telefone,
                      endereco: atualizado?.endereco ?? values.endereco,
                      cpf: atualizado?.cpf ?? values.cpf,
                    }
                  : prev.perfil,
              }
            : prev,
        );
        setMessage('Perfil atualizado com sucesso.');
        router.push('/perfil');
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Erro ao salvar perfil');
      } finally {
        setSaving(false);
      }
    },
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const perfilRes = await fetchAPI('/auth/perfil');
        const perfilData = perfilRes?.dados || null;

        if (!perfilData?.perfil) {
          throw new Error('Perfil não encontrado');
        }

        setPerfil(perfilData);
        try {
          const voluntarioRes = await fetchAPI('/voluntarios/me');
          const voluntarioData = voluntarioRes?.dados || null;
          setVoluntario(voluntarioData);
          formik.setValues({
            nome: perfilData.perfil.nome || '',
            telefone: perfilData.perfil.telefone || '',
            endereco: perfilData.perfil.endereco || '',
            cpf: perfilData.perfil.cpf || '',
            bio: voluntarioData?.bio || '',
          });
        } catch {
          setVoluntario(null);
          formik.setValues({
            nome: perfilData.perfil.nome || '',
            telefone: perfilData.perfil.telefone || '',
            endereco: perfilData.perfil.endereco || '',
            cpf: perfilData.perfil.cpf || '',
            bio: '',
          });
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Erro ao carregar perfil');
      } finally {
        setLoading(false);
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-600">Carregando edição de perfil...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Editar perfil</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-800">{perfil?.perfil?.nome || 'Seu perfil'}</h1>
            </div>

            <Button variant="outlined" onClick={() => router.push('/perfil')} sx={{ textTransform: 'none' }}>
              Voltar
            </Button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Informações básicas</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={formik.values.nome}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                value={perfil?.email || ''}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={formik.values.telefone}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                value={formik.values.cpf}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                multiline
                minRows={3}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Endereço e contato</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextField
                fullWidth
                label="Endereço"
                name="endereco"
                value={formik.values.endereco}
                onChange={formik.handleChange}
                multiline
                minRows={3}
              />
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <div className="mb-3 flex items-center gap-2 text-slate-800">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>{perfil?.email || '—'}</span>
                </div>
                <div className="mb-3 flex items-center gap-2 text-slate-800">
                  <FontAwesomeIcon icon={faPhone} />
                  <span>{formik.values.telefone || '—'}</span>
                </div>
                <p>Bio do voluntário: {voluntario?.bio || formik.values.bio || '—'}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outlined" onClick={() => router.push('/perfil')} sx={{ textTransform: 'none' }}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" disabled={saving} sx={{ textTransform: 'none', bgcolor: 'rgb(22 101 52)' }}>
              {saving ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
