import { makeAutoObservable } from 'mobx';
import AuthService from '../api/services/AuthService';
import UserService from '../api/services/UserService';
import { parseJwt } from '@/utils/parseJwt';
import { IUser } from '../models/IUser';
// import axios from 'axios';
// import { AuthResponse } from '@/models/response/AuthResponse';

type AuthUserType = IUser | null;

export default class OldAuthSlice {
  user = null as AuthUserType;
  isAuth = false; // Ещё бы на протухание токена этот момент предусмотреть автоматически... интерцептор мэйби
  isLoading = false;
  // Если иду таким путем, тогда и объект ошибки - Error | null

  // Вот в этом месте засада была. Инициировать нужно именно тут, а не в конструкторе, чтобы this не терялся

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
      const authResponse = await AuthService.login(email, password);
      const accessToken = authResponse.data.accessToken; // TODO: Так-то можно паттерн адаптер заюзать... а ещё у аксиоса свой какой-то есть вроде
      localStorage.setItem('accessToken', accessToken);
      const parsedToken = parseJwt(accessToken);
      this.setIsAuth(true);
      const userResponse = await UserService.fetchUser(parsedToken.sub); // слишком много полей, кстати, отдаю. Часть из них нельзя отдавать на клиент
      this.setUser(userResponse.data);
    } catch (error: any) {
      console.error(error);
      // console.error(error.response?.data?.message); undefined?
    }
  }

  async registration(email: string, password: string) {
    try {
      const authResponse = await AuthService.login(email, password);
      const accessToken = authResponse.data.accessToken; // TODO: Так-то можно паттерн адаптер заюзать... а ещё у аксиоса свой какой-то есть вроде
      localStorage.setItem('accessToken', accessToken);
      const parsedToken = parseJwt(accessToken);
      this.setIsAuth(true);
      const userResponse = await UserService.fetchUser(parsedToken.sub); // слишком много полей, кстати, отдаю. Часть из них нельзя отдавать на клиент
      this.setUser(userResponse.data);
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

  /*
  У меня вроде нет необходимости в этом методе, но вот с лоадингом надо взять приём. Не, вот как раз его и будешь вызывать при первой загрузке сайта каждый раз (хэдера). Только сделай всё как тебе надо и убедись, что хэдер отрисовывается действительно только 1 раз и навигация на его перерисовку не влияет. Иначе в апп (или где там в новом нексте всё это делается).
  На данный момент мне логика видится так:
  1) Проверяется в локалсторадже ацесс токен и если есть, то
  2) Парсится
  3) Сравнивается дата протухания и текущая
  4) Если всё ок - юзер из пэйлода запрашивается и записывается в стейт (в локалсторадже его хранить не хочу)
  5) А если что-то из этого не ок, значит из аус фолс. И именно на это состояние смотришь при отрисовке вариантов меню пользователя в хэдере
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
  */

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
