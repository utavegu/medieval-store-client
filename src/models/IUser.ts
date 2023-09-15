// не помню какие обязательные, нужно уточнить на бэке. А некоторым полям поправить типы - енумка и тд

export interface IUser {
  id: string; // не совсем так
  email: string;
  passwordHash?: string;
  firstName?: string;
  lastName?: string;
  isMale?: boolean;
  age?: number;
  contactPhone?: string;
  role: string; // енумка
  isActivated?: boolean;
  activationLink?: string;
  refreshToken?: string;
}
