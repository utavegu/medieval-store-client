/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios from 'axios';
import { FC, FormEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { authSlice } from '@/store/auth.slice';
import { IUser } from '@/models/IUser';
import styles from './LoginForm.module.css';

// TODO: тут ещё добавить функциональность "забыли пароль?". И обеим формам "показать пароль" (чтобы символы не были звёздочками)

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState<IUser['email']>('client@mail.ru'); // TODO: Лучше также переделать на объект
  const [password, setPassword] = useState<string>('CLIENT__!123slojno');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    authSlice.login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.loginForm}
    >
      {/* Не тут, разумеется */}
      {/* ТАААК, ВОТ ТУТ СРАЗУ 2 ОШИБКИ ВАЛИТ - УБИРАЮ. Так, а если юз клайнт добавить? */}
      {/* {authSlice.error && <div>Ошибка! Попробуйте позже</div>}
      {authSlice.isLoading && <div>Загрузка</div>} */}
      {/* TODO: Параграф, а не дивижин... и вообще сделай всё красиво, образец в админке вроде... или вон - форма регистрации. По хорошему форма должна быть одна, только с флагом - логин или регистрэйшн и незначительными изменениями логики (точнее это даже не флаг, а енумка. И некоторые поля рендерятся только в определенных формах. Только не переусложни смотри.). За образец бери "регистрэйшн" */}
      <div>
        <label htmlFor="email">Логин</label>
        <input
          type="email"
          id="email"
          // placeholder='Логин'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          // placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        // Похоже тоже выдаёт ошибку, убираю
        // disabled={authSlice.isLoading}
      >
        Залогиниться
      </button>
    </form>
  );
};

export default observer(LoginForm);
