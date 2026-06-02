// Base API configuration and utilities
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://back-end-lab-invest.vercel.app/api';

/**
 * Generic fetch wrapper for API calls
 * @param {string} endpoint - The API endpoint (without base URL)
 * @param {object} options - Fetch options
 * @returns {Promise<any>}
 */
export const fetchAPI = async (endpoint, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // build url: allow passing absolute URLs or relative endpoints
  const url = endpoint && (typeof endpoint === 'string') && (endpoint.startsWith('http://') || endpoint.startsWith('https://'))
    ? endpoint
    : `${API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  // prepare headers
  const headers = { ...(options.headers || {}) };

  // if body is FormData, let browser set Content-Type (including boundary)
  const isFormData = options.body instanceof FormData;
  if (!isFormData) headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const opts = { ...options, headers };

  // stringify JSON body when needed
  if (opts.body && !isFormData && typeof opts.body !== 'string') {
    opts.body = JSON.stringify(opts.body);
  }

  try {
    const response = await fetch(url, opts);

    if (!response.ok) {
      let errBody = null;
      try { errBody = await response.json(); } catch { errBody = await response.text().catch(() => null); }
      const message = errBody && (errBody.erro || errBody.message) ? (errBody.erro || errBody.message) : `API error: ${response.status}`;
      throw new Error(message);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) return response.json();
    if (response.status === 204) return null;
    return response.text();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Resolve URLs de imagens: URLs absolutas passam direto;
// URLs relativas (/uploads/...) são prefixadas com o host do backend.
const BACKEND_BASE = API_URL.replace(/\/api$/, '');
export const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${BACKEND_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
};

const api = { fetchAPI, API_URL, resolveImageUrl };

export default api;
