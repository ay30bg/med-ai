import React from 'react';
import Stethoscope from '../assets/favicon-32x32.png'
import './Header.css';

function Header({ theme, setTheme }) {
  return (
    <header className="header">
      {/* <div className="logo">{Stethoscope}</div> */}

      <img src={Stethoscope} alt="" />
      <h1>Med-Ai</h1>
      <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}

export default Header;