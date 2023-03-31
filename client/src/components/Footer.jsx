import React from 'react';
import Logo from '../assets/dark-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <p></p>
      <span>{currentYear} &copy; Aster Education</span>
    </footer>
  );
};

export default Footer;
