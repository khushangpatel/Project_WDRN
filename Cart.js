import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/cart');
            setCartItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(itemId);
            return;
        }

        try {
            await axios.put('http://localhost:8000/api/cart/update', {
                itemId,
                quantity: newQuantity
            });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            await axios.post('http://localhost:8000/api/cart/remove', { itemId });
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            // Process checkout (clear cart in backend)
            await axios.post('http://localhost:8000/api/cart/clear');
            
            // Redirect to thank you page after slight delay for better UX
            setTimeout(() => {
                navigate('/thank-you');
            }, 500);
        } catch (error) {
            console.error('Checkout failed:', error);
            setIsCheckingOut(false);
            alert('THANK YOU VISIT AGAIN.');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (loading) {
        return <div className="loading-message">Loading cart...</div>;
    }

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
                <div className="empty-cart-message">
                    {isCheckingOut ? (
                        <div className="processing-checkout">
                            Processing your order...
                        </div>
                    ) : (
                        'Your cart is empty'
                    )}
                </div>
            ) : (
                <>
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item">
                                <div className="item-info">
                                    <h3 className="item-name">{item.name}</h3>
                                    <p className="item-description">{item.description}</p>
                                    <div className="item-price">₹{item.price}</div>
                                </div>
                                
                                <div className="quantity-controls">
                                    <button 
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        disabled={isCheckingOut}
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        disabled={isCheckingOut}
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <button 
                                    className="remove-btn"
                                    onClick={() => removeItem(item._id)}
                                    disabled={isCheckingOut}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <div className="total-section">
                            <span className="total-label">Total:</span>
                            <span className="total-amount">₹{calculateTotal()}</span>
                        </div>
                        
                        <button 
                            className={`checkout-btn ${isCheckingOut ? 'processing' : ''}`}
                            onClick={handleCheckout}
                            disabled={isCheckingOut || cartItems.length === 0}
                        >
                            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;