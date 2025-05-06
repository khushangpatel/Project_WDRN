import React from 'react';
import { Link } from 'react-router-dom';
import './styles/ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
        <p>We appreciate your business and hope you enjoy your purchase.</p>
        <p>Visit us again soon for more amazing products.</p>
        <Link to="/" className="return-home-btn">Return to Home</Link>
      </div>
    </div>
  );
};

export default ThankYou;