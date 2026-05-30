import { fetchAPI } from './api';

// Clientes são perfis com role CLIENTE — mapeados para /perfis no backend
export const clienteService = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return fetchAPI(`/perfis${qs ? `?${qs}` : ''}`);
  },

  async getById(id) {
    return fetchAPI(`/perfis/${id}`);
  },

  async getMe() {
    return fetchAPI('/perfil/meu');
  },

  async updateMe(data) {
    return fetchAPI('/perfil/meu', { method: 'PUT', body: data });
  },

  async update(id, data) {
    return fetchAPI(`/perfis/${id}`, { method: 'PUT', body: data });
  },

  async delete(id) {
    return fetchAPI(`/perfis/${id}`, { method: 'DELETE' });
  },
};

export default clienteService;
