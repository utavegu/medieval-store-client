import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import { IUser } from '../models/IUser';
import axios from 'axios';
import { AuthResponse } from '@/models/response/AuthResponse';

// TODO: AuthSlice/AuthReducer и стор - общий индекс, куда все слайсы импортируются

export default class Store {
  user = {} as IUser;
  isAuth = false; // Ещё бы на протухание токена этот момент предусмотреть автоматически... интерцептор мэйби
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
    // TODO: Используешь это состояние где надо, и можно делать не тернарник, а возвращение компонента через ретурн
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user); // TODO: А, ну правильно, тут ведь никакой юзер не прилетает. Надо его дёрнуть руками тут и только тогда упихать. Для этого, полагаю, расшифровать JWT-токен и по айдишнику дёрнуть. Ну и на бэке должна быть это защищенная ручка... и тут юзер-сервис... в общем пока прилично делов. Сервер к таком ещё не готов - не хватает нужных гард и прав
    } catch (error: any) {
      console.error(error.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user); // Аналогично
    } catch (error: any) {
      console.error(error.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      if (response?.statusText === 'OK') {
        localStorage.removeItem('accessToken');
        this.setIsAuth(false);
        this.setUser({} as IUser);
      }
    } catch (error: any) {
      console.error(error.response?.data?.message);
    }
  }

  async checkIsAuth() {
    this.setLoading(true);
    try {
      // По хорошему лучше отдельный инстанс тогда, думаю. Или вообще иную реализацию...
      const response = await axios.get<AuthResponse>('http://localhost:4000/api/auth/refresh', {
        withCredentials: true,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user); // Аналогично
      // и снова не предусматривается вариант, что токен протух... однако может он при таком кейсе автоматически удаляется, что-то я запамятовал... надо потестить
      // и помни про оборачивание компонента в observer! из mobx-react-lite
    } catch (error: any) {
      console.error(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  // TODO: для проверки прав доступа, потом удалить
  async test() {
    try {
      await AuthService.test();
    } catch (error: any) {
      console.error(error.response?.data?.message);
    }
  }
}

// console.error((error as AxiosError).message)
