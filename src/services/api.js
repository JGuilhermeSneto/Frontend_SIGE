import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: injeta CSRF token do cookie em todas as requisições mutação
api.interceptors.request.use((config) => {
  const csrfCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='));
  if (csrfCookie) {
    config.headers['X-CSRFToken'] = csrfCookie.split('=')[1];
  }
  return config;
});

// Interceptor: redireciona para login em caso de 401/403
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
