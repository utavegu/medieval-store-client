/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from 'next/image';
// import styles from './page.module.css';

'use client';

import axios, { AxiosError } from 'axios';
import React, { FormEvent, useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegistrationForm from '@/components/RegistrationForm';

const serverApiURL = 'http://localhost:4000/api';
const getUsersEndpoint = `${serverApiURL}/users`;
const loginEndpoint = `${serverApiURL}/auth/login`;
const logoutEndpoint = `${serverApiURL}/auth/logout`;
const testProtectEndpoint = `${serverApiURL}/auth/test`;
const resreshTokenEndpoint = `${serverApiURL}/auth/refresh`;

// TODO: я бы из соображений секурности ещё автокомплит убрал, пожалуй

const handleGetProtectEndpoint = async () => {
  // TODO: Тут ещё есть такой момент, что если ацесс токен протух, то первым запросом он не пустит, но обновит ацесс токен. А вторым уже будет нормальный открытый доступ. Нужно вот как-то сделать чтобы для юзера это без подрыва происходило и он не замечал этих подкапотных дел и сразу просто получал доступ к ручке, если рефреш-токен ещё актуален. Тут, скорее всего в интерсепторе нужно будет что-то пошаманить.
  // TODO: https или http в зависимости от ноденв продакшн
  // Потому что только бэки умеют общаться через имя микросервиса, а фронту нужно указывать внешний адрес и на бэке настраивать его в корс ориджин
  try {
    const response = await axios.request({
      method: 'get',
      url: testProtectEndpoint,
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    });
  } catch (error) {
    console.error((error as AxiosError).message);
  }
};

const handleLogout = async () => {
  try {
    const response = await axios.request({
      method: 'get',
      url: logoutEndpoint,
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      withCredentials: true, // без него не даст серверу затереть рефреш-токен
    });
    if (response?.statusText === 'OK') {
      localStorage.removeItem('accessToken');
    }
  } catch (error) {
    console.error((error as AxiosError).message);
  }
};

axios.interceptors.response.use(
  (response) => {
    // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
    // Здесь можете сделать что-нибудь с ответом
    return response;
  },
  (error) => {
    // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
    // Здесь можете сделать что-то с ошибкой ответа
    // console.log('intercept error');
    // console.log((error as AxiosError).message); // Request failed with status code 401

    const errorMessage = error?.response?.data?.data?.errorMessage?.message; // TODO: Ну ппц... покороче до него точно никак не добраться? Ох уж эти обёртки аксиоса

    if (errorMessage === 'TokenExpiredError') {
      (async () => {
        try {
          const response = await axios.request({
            method: 'get',
            url: resreshTokenEndpoint,
            withCredentials: true,
          });

          if (!response) {
            return;
          }

          const accessToken = response?.data?.accessToken;

          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
          }

          // и вот где-то тут нужно повторить проваленный запрос, который привёл к перехвату этой ошибки интерцептором
        } catch (error) {
          console.error('Tokens update request error');
          return error;
        }
      })();
    }
    // return Promise.reject(error);
  }
);

export default function Home() {
  return (
    <>
      {/* <h2>Форма регистрации</h2>
      <RegistrationForm />
      <br /><hr /><br /> */}
      <h2>Форма входа</h2>
      <LoginForm loginEndpoint={loginEndpoint} />
      <button onClick={handleGetProtectEndpoint}>Проверить права доступа</button>
      <button onClick={handleLogout}>LOGOUT</button>
      <br />
      <br />
      <p>Тестовый логин:</p>
      test@mail.ru
      <br />
      <br />
      <p>Тестовый пароль:</p>
      1dd2__345A__!f-f+s
    </>
    // <main className={styles.main}>
    //   <div className={styles.description}>
    //     <p>
    //       Get started by editing&nbsp;
    //       <code className={styles.code}>src/app/page.tsx</code>
    //     </p>
    //     <div>
    //       <a
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{' '}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className={styles.vercelLogo}
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className={styles.center}>
    //     <Image
    //       className={styles.logo}
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className={styles.grid}>
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Docs <span>-&gt;</span>
    //       </h2>
    //       <p>Find in-depth information about Next.js features and API.</p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Learn <span>-&gt;</span>
    //       </h2>
    //       <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Templates <span>-&gt;</span>
    //       </h2>
    //       <p>Explore the Next.js 13 playground.</p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Deploy <span>-&gt;</span>
    //       </h2>
    //       <p>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
    //     </a>
    //   </div>
    // </main>
  );
}
