import $api from '..';
// import { IUser } from '../models/IUser';

export default class UserService {
  // TODO: обёртка аксиоса... реально надо через адаптер прогонять. И в Аус-сервисе тоже
  static async fetchUser(id: string): Promise<any> {
    return await $api.request({
      method: 'get',
      url: `/users/${id}`,
    });
  }
}
