'use client';

import { postagemSchema } from "@/schemas/postagemSchema";
import { faImage, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import SuccessModal from "@/components/Modal";
import postagemService from "@/services/postagemService";
import voluntarioService from "@/services/voluntarioService";

interface Postagem {
    id: string;
    titulo: string;
    conteudo: string;
    imagemUrl?: string;
}

interface FormPostagemTemplateProps {
    postagem?: Postagem;
}

export default function FormPostagemTemplate({ postagem: postagemProp }: FormPostagemTemplateProps) {
    const router = useRouter();
    const params = useParams();
    const [postagem, setPostagem] = useState<Postagem | undefined>(postagemProp);
    const [voluntarioId, setVoluntarioId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '' });

    // Busca o ID do voluntário logado
    useEffect(() => {
        voluntarioService.getMe()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((data: any) => {
                const vol = data?.dados ?? data;
                if (vol?.id) setVoluntarioId(vol.id);
            })
            .catch(() => {});
    }, []);

    // Busca postagem para edição quando há [id] na URL
    useEffect(() => {
        const id = params?.id as string;
        if (!id || postagemProp) return;

        postagemService.getById(id)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((data: any) => {
                const p = data?.dados ?? data;
                if (p?.id) setPostagem(p);
            })
            .catch((err: unknown) => console.error('Erro ao carregar postagem:', err));
    }, [params?.id, postagemProp]);

    const formik = useFormik({
        initialValues: {
            titulo: postagem?.titulo || '',
            conteudo: postagem?.conteudo || '',
            imagemUrl: postagem?.imagemUrl || '',
        },
        enableReinitialize: true,
        validationSchema: postagemSchema,
        onSubmit: async (values) => {
            try {
                if (!voluntarioId && !postagem?.id) {
                    setModalConfig({ title: 'Atenção', message: 'Apenas voluntários podem criar postagens.' });
                    setModalOpen(true);
                    return;
                }

                const imagemUrl = values.imagemUrl.trim() || null;

                if (postagem?.id) {
                    await postagemService.update(postagem.id, {
                        titulo: values.titulo,
                        conteudo: values.conteudo,
                        imagemUrl,
                    });
                    setModalConfig({ title: 'Sucesso!', message: 'Postagem atualizada com sucesso!' });
                } else {
                    await postagemService.create({
                        voluntarioId,
                        titulo: values.titulo,
                        conteudo: values.conteudo,
                        imagemUrl,
                    });
                    setModalConfig({ title: 'Sucesso!', message: 'Postagem criada com sucesso!' });
                }

                setModalOpen(true);
            } catch (error: unknown) {
                const msg = error instanceof Error ? error.message : 'Erro ao processar requisição';
                setModalConfig({ title: 'Erro', message: msg });
                setModalOpen(true);
            }
        },
    });

    const { handleSubmit, handleChange, values, errors, touched } = formik;
    const urlValida = values.imagemUrl.startsWith('http://') || values.imagemUrl.startsWith('https://');

    return (
        <div className="flex flex-col space-y-4 w-[50%] max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {postagem?.id ? 'Editar Postagem' : 'Nova Postagem'}
                </h1>

                {/* Preview da imagem */}
                <div className="w-full h-56 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                    {urlValida ? (
                        <img
                            src={values.imagemUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-300">
                            <FontAwesomeIcon icon={faImage} className="text-5xl" />
                            <span className="text-sm">Prévia da imagem</span>
                        </div>
                    )}
                </div>

                {/* Campo URL da imagem */}
                <TextField
                    name="imagemUrl"
                    label="URL da Imagem"
                    size="small"
                    fullWidth
                    color="success"
                    value={values.imagemUrl}
                    onChange={handleChange}
                    placeholder="https://exemplo.com/imagem.jpg"
                    InputProps={{
                        startAdornment: (
                            <FontAwesomeIcon icon={faLink} className="text-gray-400 mr-2 text-sm" />
                        ),
                    }}
                    helperText="Cole o link de uma imagem da internet (opcional)"
                />

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Informações da Postagem</h3>

                    <TextField
                        name="titulo"
                        label="Título da Postagem"
                        size="small"
                        fullWidth
                        margin="normal"
                        color="success"
                        value={values.titulo}
                        onChange={handleChange}
                        error={touched.titulo && !!errors.titulo}
                        helperText={touched.titulo && errors.titulo}
                        placeholder="Digite um título chamativo para sua postagem"
                    />

                    <TextField
                        name="conteudo"
                        label="Conteúdo"
                        multiline
                        rows={12}
                        fullWidth
                        color="success"
                        value={values.conteudo}
                        onChange={handleChange}
                        error={touched.conteudo && !!errors.conteudo}
                        helperText={touched.conteudo && errors.conteudo}
                        placeholder="Escreva o conteúdo completo da sua postagem aqui..."
                    />
                </div>

                <div className="flex gap-4">
                    <Button variant="contained" color="success" type="submit" fullWidth>
                        {postagem?.id ? 'Atualizar Postagem' : 'Publicar Postagem'}
                    </Button>
                    <Button variant="outlined" color="error" fullWidth onClick={() => router.push('/postagens')}>
                        Cancelar
                    </Button>
                </div>
            </form>

            <SuccessModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    if (modalConfig.title === 'Sucesso!') router.push('/postagens');
                }}
                title={modalConfig.title}
                message={modalConfig.message}
            />
        </div>
    );
}
