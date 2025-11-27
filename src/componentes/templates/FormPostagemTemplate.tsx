'use client';

import { postagemSchema } from "@/schemas/postagemSchema";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Postagem {
    id: string;
    titulo: string;
    conteudo: string;
    imagemUrl?: string;
    dataPublicacao?: string;
}

interface FormPostagemTemplateProps {
    postagem?: Postagem;
}

export default function FormPostagemTemplate({ postagem: postagemProp }: FormPostagemTemplateProps) {
    const router = useRouter();
    const params = useParams();
    const [imagemPreview, setImagemPreview] = useState<string | null>(null);
    const [postagem, setPostagem] = useState<Postagem | undefined>(postagemProp);

    useEffect(() => {
        const id = params?.id as string;
        if (id && !postagemProp) {
            fetch(`/api/postagens/${id}`)
                .then(async (response) => {
                    if (!response.ok) {
                        const err = await response.json().catch(() => ({}));
                        console.error('Erro ao carregar postagem:', response.status, err);
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.id) {
                        setPostagem(data);
                    }
                })
                .catch(error => {
                    console.error('Erro ao carregar postagem:', error);
                });
        }
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
                if (postagem?.id) {
                    const response = await fetch(`/api/postagens`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: postagem.id,
                            ...values,
                            imagemUrl: imagemPreview
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        alert('Postagem atualizada com sucesso!');
                        router.push('/postagens');
                    } else {
                        const err = await response.json().catch(() => ({}));
                        const msg = err?.error || err?.message || 'Erro ao tentar atualizar postagem';
                        alert(msg);
                    }
                } else {
                    const response = await fetch('/api/postagens', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...values,
                            imagemUrl: imagemPreview,
                            dataPublicacao: new Date().toISOString()
                        }),
                    });

                    if (response.status === 201 || response.ok) {
                        const data = await response.json();
                        console.log(data);
                        alert('Postagem criada com sucesso!');
                        router.push('/postagens');
                    } else {
                        const err = await response.json().catch(() => ({}));
                        const msg = err?.error || err?.message || 'Erro ao tentar criar postagem';
                        alert(msg);
                    }
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao processar requisição');
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
        if (postagem?.imagemUrl) {
            setImagemPreview(postagem.imagemUrl);
        }
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
                            <FontAwesomeIcon icon={faImage} className="text-gray-400 text-6xl" />
                        )}
                    </div>
                    <Button
                        variant="outlined"
                        color="success"
                        component="label"
                        size="small"
                        startIcon={<FontAwesomeIcon icon={faCamera} />}
                    >
                        Selecionar Imagem
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImagemChange}
                        />
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Formatos aceitos: JPG, PNG, GIF (máx. 5MB)</p>
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
                    <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        fullWidth
                    >
                        {postagem?.id ? 'Atualizar Postagem' : 'Publicar Postagem'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() => router.push('/postagens')}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}