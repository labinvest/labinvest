import { fetchAPI } from './api';

export const avaliacaoService = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return fetchAPI(`/avaliacoes${qs ? `?${qs}` : ''}`);
  },

  async getById(id) {
    return fetchAPI(`/avaliacoes/${id}`);
  },

  async create(data) {
    return fetchAPI('/avaliacoes', { method: 'POST', body: data });
  },

  async delete(id) {
    return fetchAPI(`/avaliacoes/${id}`, { method: 'DELETE' });
  },
};

export default avaliacaoService;
