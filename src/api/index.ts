import { AuthResponse } from '@/models/response/AuthResponse';
import axios from 'axios';

const $api = axios.create({
  withCredentials: true, // автоматическое подцепление куки
  baseURL: 'http://localhost:4000/api', // адрес апи (сервера) TODO: брать из ЕНВ (помни там про некстовый префикс енвов, перечитай доку)
});

// перехватчик запроса
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
    // const errorMessage = error?.response?.data?.data?.errorMessage?.message; // TODO: Ну ппц... покороче до него точно никак не добраться? Ох уж эти обёртки аксиоса
    // if (errorMessage === 'TokenExpiredError') {  // Это старая реализация, но я всё равно её оставлю, так как опыт интаресный. На бэкэнде эта порнография происходит в AccessTokenGuard
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true; // Вот эта штука позволит работать просто с 401, без порнографии, тогда можно вместо (errorMessage === 'TokenExpiredError') проверять вот так: (error.response.status == 401 && error.config && !error.config._isRetry)
      try {
        // если использовать инстанс $api - перехватчик запроса будет посылать аццессТокен и уйдёт в бесконечный цикл... Но что если удалять его конкретно в этом запросе?
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
      }
    }
    // throw error;
    // return Promise.reject(error);
  }
);

export default $api;
