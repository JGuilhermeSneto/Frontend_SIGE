import axios from 'axios';
import { getAccessToken, getRefreshToken, refreshAccessToken, clearAuthTokens } from './auth';

const baseURL = import.meta.env.VITE_API_URL ?? '';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  const csrfCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='));
  if (csrfCookie) {
    config.headers['X-CSRFToken'] = csrfCookie.split('=')[1];
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAuthTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      clearAuthTokens();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
