import { fetchAPI } from './api';

export const voluntarioService = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return fetchAPI(`/voluntarios${qs ? `?${qs}` : ''}`);
  },

  async getById(id) {
    return fetchAPI(`/voluntarios/${id}`);
  },

  async getMe() {
    return fetchAPI('/voluntarios/me');
  },

  async createMe(data) {
    return fetchAPI('/voluntarios/me', { method: 'POST', body: data });
  },

  async updateMe(data) {
    return fetchAPI('/voluntarios/me', { method: 'PUT', body: data });
  },

  async create(data) {
    return fetchAPI('/voluntarios', { method: 'POST', body: data });
  },

  async update(id, data) {
    return fetchAPI(`/voluntarios/${id}`, { method: 'PUT', body: data });
  },

  async delete(id) {
    return fetchAPI(`/voluntarios/${id}`, { method: 'DELETE' });
  },
};

export default voluntarioService;
