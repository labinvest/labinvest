// Cliente service for managing cliente API calls
import { fetchAPI } from './api';

export const clienteService = {
  /**
   * Get all clientes
   */
  async getAll() {
    return fetchAPI('/cliente');
  },

  /**
   * Get cliente by ID
   */
  async getById(id) {
    return fetchAPI(`/cliente/${id}`);
  },

  /**
   * Create new cliente
   */
  async create(data) {
    return fetchAPI('/cliente', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update cliente
   */
  async update(id, data) {
    return fetchAPI(`/cliente/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete cliente
   */
  async delete(id) {
    return fetchAPI(`/cliente/${id}`, {
      method: 'DELETE',
    });
  },
};

export default clienteService;
