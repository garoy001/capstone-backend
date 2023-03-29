const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
	price: { type: Number, required: true },
	amount: { type: Number },
	image: { type: String },
});
const UserSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
	cart: [CartItemSchema],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
