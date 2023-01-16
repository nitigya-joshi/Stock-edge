const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},

	image: {
		type: String,
	},

	name: {
		type: String,
		required: true,
		default: "Company",
	},

	symbol: {
		type: String,
		default: "company",
	},

	current_price: {
		type: Number,
		default: 0.0,
	},

	price_change_percentage_24h: {
		type: Number,
		default: 0.0,
	},

	market_cap: {
		type: Number,
		required: true,
	},

	rank: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("Stocks", stockSchema);
