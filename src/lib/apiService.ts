import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const config = error.config as RetryConfig;
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      try {
        await api.post('/auth/refresh');
        return api(config);
      } catch (refreshError) {
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;