import { AxiosResponse } from 'axios';
import $api from '../api';
import { AuthResponse } from '../models/response/AuthResponse';

// TODO: Мэйби тебе в апи место?

export default class AuthService {
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return await $api.request<AuthResponse>({
      method: 'post',
      url: '/auth/registration',
      data: {
        email,
        password,
      },
    });
  }

  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return await $api.request<AuthResponse>({
      method: 'post',
      url: '/auth/login',
      data: {
        email,
        password,
      },
    });
  }

  // Тут надо уточнить тип, может воид, может не воид, не помню уже
  static async logout(): Promise<any> {
    return await $api.request({
      method: 'get',
      url: '/auth/logout',
    });
  }

  // TODO: ручка для проверки прав доступа - удалить потом
  static async test(): Promise<any> {
    return await $api.request({
      method: 'get',
      url: '/auth/test',
    });
  }
}
