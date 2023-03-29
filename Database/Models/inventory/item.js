const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
	price: { type: Number, required: true },
	amount: { type: Number },
	image: { type: String },
});

const Item = mongoose.model('inventory', ItemSchema);

module.exports = Item;
