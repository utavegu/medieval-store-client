import { AxiosResponse } from 'axios';
import $api from '..';
import { AuthResponse } from '../../models/response/AuthResponse';

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

  static async logout() {
    return await $api.request({
      method: 'get',
      url: '/auth/logout',
    });
  }

  static async checkAuth(): Promise<void> {
    return await $api.request({
      method: 'get',
      url: '/auth/checkauth',
    });
  }
}
