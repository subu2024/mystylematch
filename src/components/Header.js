import React from 'react';
import './Header.scss';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <header className = "header">
      <img src={logo} alt="logo" className='logo' />
    </header>
  );
};

export default Header;
