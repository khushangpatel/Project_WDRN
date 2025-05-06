import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';
import Cart from './components/Cart';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';
import ThankYou from './components/ThankYou';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
        <main className="main-content">
          <Routes>
            {/* Login Route (only accessible when logged out) */}
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} 
            />
            
            {/* Protected Routes (only accessible when logged in) */}
            <Route 
              path="/" 
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/add" 
              element={isLoggedIn ? <AddItem /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/view" 
              element={isLoggedIn ? <ViewItems /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/cart" 
              element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/details/:id" 
              element={isLoggedIn ? <ItemDetails /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/thank-you" 
              element={isLoggedIn ? <ThankYou /> : <Navigate to="/login" />} 
            />
            
            {/* Redirect any unknown paths to home */}
            <Route 
              path="*" 
              element={<Navigate to={isLoggedIn ? "/" : "/login"} />} 
            />
          </Routes>
        </main>
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;