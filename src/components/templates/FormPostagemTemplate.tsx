'use client';

import { postagemSchema } from "@/schemas/postagemSchema";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import SuccessModal from "@/components/Modal";
import postagemService from "@/services/postagemService";
import voluntarioService from "@/services/voluntarioService";
import uploadService from "@/services/uploadService";

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
    const [imagemPreview, setImagemPreview] = useState<string | null>(null);
    const [imagemUrl, setImagemUrl] = useState<string | null>(null);
    const [uploadingImg, setUploadingImg] = useState(false);
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
            .catch(() => {
                // usuário não é voluntário — o submit mostrará o erro adequado
            });
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

                if (postagem?.id) {
                    await postagemService.update(postagem.id, { titulo: values.titulo, conteudo: values.conteudo, imagemUrl });
                    setModalConfig({ title: 'Sucesso!', message: 'Postagem atualizada com sucesso!' });
                } else {
                    await postagemService.create({ voluntarioId, titulo: values.titulo, conteudo: values.conteudo, imagemUrl });
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

    const handleImagemChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Preview local imediato
        const reader = new FileReader();
        reader.onloadend = () => setImagemPreview(reader.result as string);
        reader.readAsDataURL(file);

        // Upload para o servidor
        setUploadingImg(true);
        try {
            const res = await uploadService.uploadImagem(file) as { url?: string };
            if (res?.url) setImagemUrl(res.url);
        } catch {
            setModalConfig({ title: 'Aviso', message: 'Não foi possível enviar a imagem. A postagem será salva sem ela.' });
            setModalOpen(true);
        } finally {
            setUploadingImg(false);
        }
    };

    useEffect(() => {
        if (postagem?.imagemUrl) setImagemPreview(postagem.imagemUrl);
    }, [postagem]);

    const { handleSubmit, handleChange, values, errors, touched } = formik;

    return (
        <div className="flex flex-col space-y-4 w-[50%] max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {postagem?.id ? 'Editar Postagem' : 'Nova Postagem'}
                </h1>

                <div className="flex flex-col items-center mb-6">
                    <div className="w-full h-64 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden mb-3 border-4 border-green-600">
                        {imagemPreview ? (
                            <img src={imagemPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <FontAwesomeIcon icon={faImage} className="text-6xl" />
                                <span className="text-sm">Imagem ilustrativa</span>
                            </div>
                        )}
                    </div>
                    <Button
                        variant="outlined"
                        color="success"
                        component="label"
                        size="small"
                        disabled={uploadingImg}
                        startIcon={<FontAwesomeIcon icon={faCamera} />}
                    >
                        {uploadingImg ? 'Enviando...' : 'Selecionar Imagem'}
                        <input type="file" hidden accept="image/*" onChange={handleImagemChange} />
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                        {imagemUrl ? '✓ Imagem enviada' : 'Formatos aceitos: JPG, PNG, GIF (máx. 5MB)'}
                    </p>
                </div>

                <div className="space-y-4 gap-2">
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
