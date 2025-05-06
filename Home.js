import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Groceries Go</h1>
      <div className="home-buttons">
        <Link to="/add" className="home-button">Add Products</Link>
      </div>
    </div>
  );
}

export default Home;
