/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import Wrapper from '../Wrapper/Wrapper';
import styles from './Footer.module.css';

type PropTypes = {
  contacts: any; // IContacts;
  office: any; // IOffice;
  social: any; // ISocials;
};

const Footer: FC<PropTypes> = ({ contacts, office, social }): JSX.Element => {
  // const router = useRouter();
  // const { setIsShowCallbackModal } = commonStore;
  // const projectList = projects?.map((project) => (
  //   <li className={classnames(router?.query?.project === project.seo_title && styles.currentItem)} key={project.id}>
  //     <Link href={`/projects/${project.seo_title}`}>{project.title}</Link>
  //   </li>
  // ));

  return (
    <footer className={styles.footer}>
      <Wrapper>
        <section className={styles.company}>
          <h2 className="visually-hidden">ЗАГОЛОВОК СЕКЦИИ</h2>
          <b className={classnames(styles.footerSectionHeading, styles.onlyDesktop)}>Компания</b>
          {/* <Accordion heading="Компания" id="footer-company" chevronColor={ChevronColors.WHITE}> */}
          <ul className={styles.footerList}>
            {/* <li className={classnames(router.route === '/*' && styles.currentItem)}> */}
            <li>
              <Link href="/about">Пункт 1</Link>
            </li>
            <li>
              <a href="https://*/">Пункт 2</a>
            </li>
            {/* <li className={classnames(router.route === '/*' && styles.currentItem)}> */}
            <li>
              <Link href="/*">Пункт 3</Link>
            </li>
            <li className={styles.navigationItem}>
              <a href="https://*/">Пункт 4</a>
            </li>
          </ul>
          {/* </Accordion> */}
          <ul className={classnames(styles.footerList, styles.onlyDesktop)}>
            {/* <li className={classnames(router.route === '/*' && styles.currentItem)}> */}
            <li>
              <Link href="/*">Пункт 1</Link>
            </li>
            <li>
              <a href="https://*/">Пункт 2</a>
            </li>
            {/* <li className={classnames(router.route === '/*' && styles.currentItem)}> */}
            <li>
              <Link href="/*">Пункт 3</Link>
            </li>
            <li className={styles.navigationItem}>
              <a href="https://*/">Пункт 4</a>
            </li>
          </ul>
        </section>

        <section className={styles.projects}>
          <h2 className="visually-hidden">ЗАГОЛОВОК СЕКЦИИ</h2>
          <b className={classnames(styles.footerSectionHeading, styles.onlyDesktop)}>
            <Link
              legacyBehavior
              href="/*"
            >
              <a
                href="/*"
                className={styles.sectionHeadingLink}
              >
                Ссылка
              </a>
            </Link>
          </b>
          {/* <Accordion heading="Проекты" id="footer-projects" chevronColor={ChevronColors.WHITE}> */}
          <ul className={styles.footerList}>{/* {projectList} */}</ul>
          {/* </Accordion> */}
          <ul className={classnames(styles.footerList, styles.onlyDesktop)}>{/* {projectList} */}</ul>
        </section>

        <section className={styles.social}>
          <h2 className="visually-hidden">ЗАГОЛОВОК СЕКЦИИ</h2>
          <b className={classnames(styles.footerSectionHeading, styles.socialHeading)}>Подпишись на нас</b>
          {/* <SocialNetworks links={social} variant={SocialVariant.FOOTER} /> */}
        </section>

        <section className={styles.contacts}>
          <h2 className="visually-hidden">Контакты</h2>
          <div className={styles.addressContainer}>
            <b className={classnames(styles.footerBaza, styles.onlyMobile)}>*</b>
            <address className={styles.footerAddress}>
              {office.address}, {office.title}
            </address>
          </div>

          <div className={classnames((styles.workingHoursBlock, styles.onlyDesktop))}>
            <p>Время работы</p>
            <p>
              с 9:00 до 21:00 <br /> ежедневно
            </p>
            <p>
              с 10:00 до 17:00 <br /> в праздничные дни
            </p>
          </div>

          <button
            className={classnames([styles.footerCallback, styles.onlyDesktop])}
            // onClick={() => setIsShowCallbackModal(true)}
          >
            Заказать обратный звонок
          </button>

          <a
            className={classnames([styles.footerMail, styles.onlyDesktop])}
            href="mailto:test@mail.ru"
          >
            e-mail: test@mail.ru
          </a>

          {/* <a className={styles.footerPhone} href={`tel:${spaceSweeper(contacts.commonPhone)}`}>
            {contacts.commonPhone}
          </a> */}
        </section>

        <section className={styles.policy}>
          <h2 className="visually-hidden">Политика конфиденциальности</h2>
          <p className={styles.policyLink}>
            <a
              href={'/*_policy.pdf'}
              target="_blank"
              rel="noreferrer"
            >
              Политика конфиденциальности
            </a>
          </p>
          <p className={styles.offer}>Данный сайт ни при каких обстоятельствах не является публичной офертой</p>
        </section>
      </Wrapper>
    </footer>
  );
};

export default Footer;
