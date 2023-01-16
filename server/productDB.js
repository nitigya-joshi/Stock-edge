require("dotenv").config();
const connectDB = require("./db/connect");
const Stocks = require("./models/stocks");
const StocksData = require("./top_stocks.json");

const start = async () => {
	try {
		await connectDB(process.env.MONGODB_URL);
		await Stocks.deleteMany({});
		await Stocks.create(StocksData);
		console.log("Sucess in Stocksdb");
	} catch (err) {
		console.log(err);
	}
};

start();
