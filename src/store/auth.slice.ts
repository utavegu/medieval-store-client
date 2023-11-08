import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AuthService from '../api/services/AuthService';
import UserService from '../api/services/UserService';
import { parseJwt } from '@/utils/parseJwt';
import { IUser } from '../models/IUser';

type AuthUserType = IUser | null;

class AuthSlice {
  user = null as AuthUserType;
  isLoading = false;
  error = null as Error | null;

  // Вот в этом месте засада была. Инициировать нужно именно тут, а не в конструкторе, чтобы this не терялся. Не забывай про это (критично при работе с асинхронщиной)

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'AuthPersistStore',
      properties: ['user'],
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    });
  }

  setUser(user: IUser | null) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
    // TODO: Используешь это состояние где надо, и можно делать не тернарник, а возвращение компонента через ретурн
  }

  setError(error: Error | null) {
    this.error = error;
  }

  async login(email: string, password: string) {
    try {
      this.setLoading(true);
      this.setError(null);
      const authResponse = await AuthService.login(email, password);
      const accessToken = authResponse.data.accessToken; // TODO: Так-то можно паттерн адаптер заюзать... а ещё у аксиоса свой какой-то есть вроде
      localStorage.setItem('accessToken', accessToken);
      const parsedToken = parseJwt(accessToken);
      const userResponse = await UserService.fetchUser(parsedToken.sub); // TODO: слишком много полей, кстати, отдаю. Часть из них нельзя отдавать на клиент. Ссылку для активации точно не надо и рефреш токен, скорее всего тоже, он должен на бэке из кук подхватываться. Проверь уже.
      this.setUser(userResponse.data);
    } catch (error: any) {
      console.error(error);
      this.setError(error as Error);
      // console.error(error.response?.data?.message); undefined? скорее всего из-за того, что на эту ручку на бэке гарду повесил - "только для гостей"
    } finally {
      this.setLoading(false);
    }
  }

  async registration(email: string, password: string) {
    try {
      this.setLoading(true);
      this.setError(null);
      // TODO: DRY! Но скорее всего надо поменять логику и предлагать активировать эккаунт, а не вот так.
      const authResponse = await AuthService.login(email, password); // почему, кстати, вообще в логин долблюсь? Да, тут определенно что-то не так.
      const accessToken = authResponse.data.accessToken; // TODO: Так-то можно паттерн адаптер заюзать... а ещё у аксиоса свой какой-то есть вроде. Разберись.
      localStorage.setItem('accessToken', accessToken);
      const parsedToken = parseJwt(accessToken);
      const userResponse = await UserService.fetchUser(parsedToken.sub); // слишком много полей, кстати, отдаю. Часть из них нельзя отдавать на клиент (детали выше)
      this.setUser(userResponse.data);
    } catch (error: any) {
      console.error(error.response?.data?.message);
      this.setError(error as Error);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      this.setLoading(true);
      this.setError(null);
      const response = await AuthService.logout();
      if (response?.statusText === 'OK') {
        localStorage.removeItem('accessToken');
        this.setUser(null);
      }
    } catch (error: any) {
      console.error(error.response?.data?.message);
      this.setError(error as Error);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    try {
      this.setLoading(true);
      this.setError(null);
      await AuthService.checkAuth();
    } catch (error: any) {
      console.error(error.response?.data?.message);
      this.setError(error as Error);
    } finally {
      this.setLoading(false);
    }
  }

  async removeClientSession() {
    localStorage.removeItem('accessToken');
    this.setUser(null);
  }
}

const authSlice = new AuthSlice();
export { authSlice };
