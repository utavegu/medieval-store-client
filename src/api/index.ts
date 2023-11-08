import axios from 'axios';
// import { authSlice } from '@/store/auth.slice';
import { AuthResponse } from '@/models/response/AuthResponse';

const $api = axios.create({
  withCredentials: true, // автоматическое подцепление куки
  baseURL: 'http://localhost:4000/api', // адрес апи (сервера) TODO: брать из ЕНВ (помни там про некстовый префикс енвов, перечитай доку. Можно, кстати, через некст конфиг, вроде, настроить так, чтобы и без этого префикса работало)
});

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>('http://localhost:4000/api/auth/refresh', {
          withCredentials: true,
        });
        const accessToken = response?.data?.accessToken;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          return $api.request(originalRequest);
        }
      } catch (error) {
        console.error('User is unautorised!');
        // authSlice.removeClientSession();
      }
    }
  }
);

export default $api;
