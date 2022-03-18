import React from 'react';
import Htag from '@components/Htag';
import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className={styles.container}>
      <Htag asTitle>{title}</Htag>
    </div>
  );
};

export default Header;
