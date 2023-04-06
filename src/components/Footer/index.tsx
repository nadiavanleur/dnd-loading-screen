import React from 'react';
import * as style from './style.module.scss';
import Icon from '../Icon';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Icon icon="logo" />
    </footer>
  );
}

export default Footer;