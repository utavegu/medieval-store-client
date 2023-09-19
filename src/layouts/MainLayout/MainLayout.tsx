// Core
import React, { FC } from 'react';
// import Script from 'next/script';
import classnames from 'classnames';

// Layouts
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Styles
import styles from './MainLayout.module.css';

type PropTypes = {
  children: React.ReactNode;
  common?: any; // ICommon;
  isEnabledHorizontalScrollTrap?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainLayout: FC<PropTypes> = ({ children, common, isEnabledHorizontalScrollTrap = true }) => {
  // const { contacts, office, social } = common;
  // const { isShowCallbackModal, setIsShowCallbackModal } = commonStore;
  const contacts = '123';
  const office = '2344';
  const social = '4124';

  return (
    <>
      <div className={classnames(styles.layout, isEnabledHorizontalScrollTrap && styles.scrollTrap)}>
        <Header contacts={contacts} />
        <main>{children}</main>
        <Footer
          contacts={contacts}
          office={office}
          social={social}
        />
      </div>
      {/* <Modal active={isShowCallbackModal} setActive={setIsShowCallbackModal} variant={ModalVariant.FEEDBACK}>
        <FeedbackForm {...feedbackFormData} />
      </Modal> */}
    </>
  );
};

export default MainLayout;
