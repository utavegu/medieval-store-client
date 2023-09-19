import React, { FC } from 'react';
import styles from './Wrapper.module.css';

type PropTypes = {
  children: React.ReactNode;
};

const Wrapper: FC<PropTypes> = ({ children }): JSX.Element => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
