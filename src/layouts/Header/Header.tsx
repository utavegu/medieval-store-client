'use client'; // вероятно временно

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { authSlice } from '@/store/auth.slice';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import Image from 'next/image';
// import { spaceSweeper } from '../../utils/spaceSweeper';
import Wrapper from '../Wrapper/Wrapper';
// import Navigation from '../../components/Navigation/Navigation';
// import Button from '../../components/Button/Button';
// import { ButtonVariant } from '../../typing/enums/buttons.enum';
// import { IContacts } from '../../typing/interfaces/ICommon';
import Navigation from '@/components/Navigation';
import UserMenu from '@/components/UserMenu';
import styles from './Header.module.css';

type PropTypes = {
  contacts: any; // IContacts;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header: FC<PropTypes> = ({ contacts }): JSX.Element => {
  // const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*
  useEffect(() => {
    // Тут мне видится так, что нужно заглядывать в локалсторадж, проверять наличие ацесс токена, если он есть парсить его и сравнивать его экспр с текущей датой-временем. Если текущая больше или равна - вызывать метод разлогина. И всё это не тут, а скорее в сторе, а тут только сам метод дёргать.  Либо просто делать "фетч юзер", а бэк уже там сам разрулит. Подумай ещё на свежую голову, но точно знаю что надо сделать подобный механизм от протухания токена ещё и запускать его 1 раз при заходе на сайт. Дергать юзера, пожалуй, будет более отказоустойчиво, так как на бэке все эти механизмы с токенами уже хорошо отлажены. Но можно в качестве дополнительной проверки и таймстэмпы сравнить, всё равно токен парсить будешь. Кстати, обрати внимание, что сейчас обновление страницы разлогинивает - вот это тоже поправь.
  }, [])
  */

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     if (isMenuOpen) {
  //       document.body.classList.add('prohibit-scrolling');
  //     } else {
  //       document.body.classList.remove('prohibit-scrolling');
  //     }
  //   }
  // }, [isMenuOpen]);

  return (
    <header className={classnames(styles.header, isMenuOpen && styles.fullscreenMenu)}>
      <Wrapper>
        <div className={styles.menuHeading}>
          <Navigation />
          <UserMenu user={authSlice.user} />
          {/* {router.pathname === '/' ? (
            <div>
              <Image src="/img/icons/company-logo.svg" alt="Логотип компании" width="34" height="36" />
            </div>
          ) : (
            <Link href="/">
              <a href="/">
                <Image src="/img/icons/company-logo.svg" alt="Логотип компании" width="34" height="36" />
              </a>
            </Link>
          )} */}
          {!isMenuOpen && (
            // <a className={styles.menuHeadingPhone} href={`tel:${spaceSweeper(contacts.commonPhone)}`}>
            //   {contacts.commonPhone}
            // </a>
            <div></div>
          )}
          <button
            className={classnames(styles.toggleMenuButton, isMenuOpen ? styles.close : styles.open)}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span className="visually-hidden">Закрыть / открыть</span>
          </button>
        </div>
        <div className={classnames(styles.menu, isMenuOpen ? styles.visible : styles.hidden)}>
          {/* <Navigation /> */}
          <div className={styles.interactiveContainer}>
            {/* <a className={styles.phoneInMenu} href={`tel:${spaceSweeper(contacts.commonPhone)}`}>
              {contacts.commonPhone}
            </a>
            <Button className={styles.chooseFlatButton} variant={ButtonVariant.WHITE} isLink linkAdress="/*">
              Выберите
            </Button> */}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default observer(Header);
