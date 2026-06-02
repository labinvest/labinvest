import { fetchAPI } from './api';

export const faqService = {
  async getAll() {
    return fetchAPI('/faqs');
  },

  async getById(id) {
    return fetchAPI(`/faqs/${id}`);
  },

  async enviarContato(data) {
    return fetchAPI('/contato', { method: 'POST', body: data });
  },
};

export default faqService;
