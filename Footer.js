import React from 'react';
import './styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        © {new Date().getFullYear()} Groceries Go. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
