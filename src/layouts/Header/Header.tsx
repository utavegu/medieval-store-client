'use client';

import React, { FC, useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import Image from 'next/image';
import classnames from 'classnames';
// import { spaceSweeper } from '../../utils/spaceSweeper';
import Wrapper from '../Wrapper/Wrapper';
// import Navigation from '../../components/Navigation/Navigation';
// import Button from '../../components/Button/Button';
// import { ButtonVariant } from '../../typing/enums/buttons.enum';
// import { IContacts } from '../../typing/interfaces/ICommon';
import styles from './Header.module.css';

type PropTypes = {
  contacts: any; // IContacts;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header: FC<PropTypes> = ({ contacts }): JSX.Element => {
  // const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div>что-то</div>
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

export default Header;
