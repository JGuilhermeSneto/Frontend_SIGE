import axios from 'axios';

// Sem VITE_API_URL: em dev o Vite encaminha ``/api`` para o Django (vite.config.js).
// Com VITE_API_URL: chamadas diretas ao back (útil se o front não usar o proxy).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
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
