'use client';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';

export default function UploadImagem() {
  const [imagem, setImagem] = useState<File | null>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagem(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="subtitle1">Anexar imagem</Typography>

      <Button variant="outlined" component="label" color="success">
        Selecionar imagem
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleUpload}
        />
      </Button>

      {imagem && (
        <Typography variant="body2" color="textSecondary">
          Imagem selecionada: {imagem.name}
        </Typography>
      )}
    </div>
  );
}
