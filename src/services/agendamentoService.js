// Agendamento service for managing agendamento API calls
import { fetchAPI } from './api';

export const agendamentoService = {
  /**
   * Get all agendamentos
   */
  async getAll() {
    return fetchAPI('/agendamento');
  },

  /**
   * Get agendamento by ID
   */
  async getById(id) {
    return fetchAPI(`/agendamento/${id}`);
  },

  /**
   * Create new agendamento
   */
  async create(data) {
    return fetchAPI('/agendamento', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update agendamento
   */
  async update(id, data) {
    return fetchAPI(`/agendamento/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete agendamento
   */
  async delete(id) {
    return fetchAPI(`/agendamento/${id}`, {
      method: 'DELETE',
    });
  },
};

export default agendamentoService;
