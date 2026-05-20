// Postagem service for managing postagens API calls
import { fetchAPI } from './api';

export const postagemService = {
  /**
   * Get all postagens
   */
  async getAll() {
    return fetchAPI('/postagens');
  },

  /**
   * Get postagem by ID
   */
  async getById(id) {
    return fetchAPI(`/postagens/${id}`);
  },

  /**
   * Create new postagem
   */
  async create(data) {
    return fetchAPI('/postagens', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update postagem
   */
  async update(id, data) {
    return fetchAPI(`/postagens/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete postagem
   */
  async delete(id) {
    return fetchAPI(`/postagens/${id}`, {
      method: 'DELETE',
    });
  },
};

export default postagemService;
