import { fetchAPI } from './api';

export const agendamentoService = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return fetchAPI(`/agendamentos${qs ? `?${qs}` : ''}`);
  },

  async getById(id) {
    return fetchAPI(`/agendamentos/${id}`);
  },

  async create(data) {
    return fetchAPI('/agendamentos', { method: 'POST', body: data });
  },

  async update(id, data) {
    return fetchAPI(`/agendamentos/${id}`, { method: 'PUT', body: data });
  },

  async updateStatus(id, status) {
    return fetchAPI(`/agendamentos/${id}/status`, { method: 'PATCH', body: { status } });
  },

  async delete(id) {
    return fetchAPI(`/agendamentos/${id}`, { method: 'DELETE' });
  },
};

export default agendamentoService;
