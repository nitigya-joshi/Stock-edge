const appUrl=process.env.REACT_APP_URL;
const appApiPort=process.env.REACT_APP_API_PORT;

export const CoinList = (currency) =>
  `http://localhost:3001/api/top-stocks/:1`;

export const SingleCoin = (id) =>
  `http://localhost:3001/api/stock-details/${id}`;

// export const HistoricalChart = (id, days = 365, currency) =>
//   `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const HistoricalChart = (id, days = 365) =>
  `http://localhost:3001/api/price/${id}/${days}`;


export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const TrendingStocks = () =>
`http://localhost:3001/api/trending-stocks/1`;
