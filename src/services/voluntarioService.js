// Voluntario service for managing voluntario API calls
import { fetchAPI } from './api';

export const voluntarioService = {
  /**
   * Get all voluntarios
   */
  async getAll() {
    return fetchAPI('/voluntario');
  },

  /**
   * Get voluntario by ID
   */
  async getById(id) {
    return fetchAPI(`/voluntario/${id}`);
  },

  /**
   * Create new voluntario
   */
  async create(data) {
    return fetchAPI('/voluntario', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update voluntario
   */
  async update(id, data) {
    return fetchAPI(`/voluntario/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete voluntario
   */
  async delete(id) {
    return fetchAPI(`/voluntario/${id}`, {
      method: 'DELETE',
    });
  },
};

export default voluntarioService;
