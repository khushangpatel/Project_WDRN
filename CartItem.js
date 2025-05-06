const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    category: String,
    deliveryTime: String,
    image: String
});

module.exports = mongoose.model('CartItem', cartItemSchema);