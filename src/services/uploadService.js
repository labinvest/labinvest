import { fetchAPI } from './api';

export const uploadService = {
  async uploadImagem(file) {
    const formData = new FormData();
    formData.append('imagem', file);
    return fetchAPI('/upload', { method: 'POST', body: formData });
  },
};

export default uploadService;
