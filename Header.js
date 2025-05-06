import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GROCERIES GO</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;
