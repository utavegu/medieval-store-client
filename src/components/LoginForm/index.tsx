import axios from 'axios';
import { FC, FormEvent, useState } from 'react';
import styles from './LoginForm.module.css';

// TODO: тут ещё добавить функциональность "забыли пароль?". И обеим формам "показать пароль" (чтобы символы не были звёздочками)

type PropTypes = {
  loginEndpoint: string;
};

const LoginForm: FC<PropTypes> = ({ loginEndpoint }): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      // через Фетч
      // await fetch(loginEndpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8'
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password
      //   }),
      //   credentials: 'include'
      // });

      // через Аксиос
      const response = await axios.request({
        method: 'post',
        url: loginEndpoint,
        data: {
          email,
          password,
        },
        withCredentials: true, // А тут зачем? Забыл уже. Потыкайся и вспомни. Предположу, что иначе просто не запишет в куки рефреш-токен из успешного ответа сервера.
      });
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.loginForm}
    >
      <div>
        <label htmlFor="email">Логин</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Отправить форму</button>
    </form>
  );
};

export default LoginForm;
