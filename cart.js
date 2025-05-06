const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

router.post('/add', async (req, res) => {
    try {
        const { itemId } = req.body;
        if (!itemId) {
            return res.status(400).json({ message: 'Item ID is required' });
        }
        const item = await CartItem.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const existingCartItem = await CartItem.findOne({ _id: itemId });
        if (existingCartItem) {
            existingCartItem.quantity += 1;
            await existingCartItem.save();
            return res.status(200).json({ message: 'Item quantity updated', item: existingCartItem });
        }

        const newItem = new CartItem({
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: 1,
            category: item.category,
            deliveryTime: item.deliveryTime,
            image: item.image
        });

        await newItem.save();
        res.status(201).json({ message: 'Item added to cart', item: newItem });
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/update', async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        if (!itemId || !quantity) {
            return res.status(400).json({ message: 'Item ID and quantity are required' });
        }

        const item = await CartItem.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.quantity = quantity;
        await item.save();
        res.status(200).json({ message: 'Quantity updated', item });
    } catch (err) {
        console.error('Error updating quantity:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/remove', async (req, res) => {
    try {
        const { itemId } = req.body;
        if (!itemId) {
            return res.status(400).json({ message: 'Item ID is required' });
        }

        const result = await CartItem.findByIdAndDelete(itemId);
        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
        console.error('Error removing item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;