import { fetchAPI } from './api';

export const postagemService = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return fetchAPI(`/posts${qs ? `?${qs}` : ''}`);
  },

  async getById(id) {
    return fetchAPI(`/posts/${id}`);
  },

  async create(data) {
    return fetchAPI('/posts', { method: 'POST', body: data });
  },

  async update(id, data) {
    return fetchAPI(`/posts/${id}`, { method: 'PUT', body: data });
  },

  async delete(id) {
    return fetchAPI(`/posts/${id}`, { method: 'DELETE' });
  },
};

export default postagemService;
