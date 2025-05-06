import React from 'react';
import axios from 'axios';
import './styles/AddItem.css';
import milkImage from './images/milk.png';
import curdImage from './images/curd.png';
import buttermilkImage from './images/buttermilk.png';
import butterImage from './images/butter.png';
import cheeseImage from './images/cheese.png';

const AddItem = () => {
    const predefinedItems = [
        {
            name: 'Amul Gold Milk',
            description: '500 ml',
            price: 30,
            quantity: 1,
            category: 'Dairy',
            deliveryTime: '30 MINS',
            image: milkImage
        },
        {
            name: 'Amul Masti Curd',
            description: '1 kg',
            price: 77,
            quantity: 1,
            category: 'Dairy',
            deliveryTime: '30 MINS',
            image: curdImage
        },
        {
            name: 'Amul Buttermilk',
            description: '250 ml',
            price: 25,
            quantity: 1,
            category: 'Dairy',
            deliveryTime: '30 MINS',
            image: buttermilkImage
        },
        {
            name: 'Amul Butter',
            description: '200 g',
            price: 45,
            quantity: 1,
            category: 'Dairy',
            deliveryTime: '30 MINS',
            image: butterImage
        },
        {
            name: 'Amul Cheese',
            description: '1 kg',
            price: 120,
            quantity: 1,
            category: 'Dairy',
            deliveryTime: '30 MINS',
            image: cheeseImage
        }
    ];

    const quickAdd = async (item) => {
        try {
            // Send image as a string path, if your backend expects it
            const itemData = {
                name: item.name,
                description: item.description,
                price: item.price,
                quantity: item.quantity,
                category: item.category,
                deliveryTime: item.deliveryTime,
                image: item.image // this is the image path imported above
            };

            const response = await axios.post('http://localhost:8000/api/items', itemData);

            if (response.status === 201) {
                alert(`${item.name} added successfully!`);
            } else {
                alert(`Error: Received status ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding item:', error.response?.data || error.message);
            alert('Failed to add item. Please try again.');
        }
    };

    return (
        <div className="add-item-container">
            <h2>Add Products</h2>
            <div className="items-grid">
                {predefinedItems.map((item, index) => (
                    <div key={index} className="item-card">
                        <div className="delivery-time">{item.deliveryTime}</div>
                        <img src={item.image} alt={item.name} className="product-image" />
                        <h4>{item.name}</h4>
                        <p className="item-description">{item.description}</p>
                        <div className="item-price">₹{item.price}</div>
                        <button className="add-button" onClick={() => quickAdd(item)}>ADD</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddItem;
