const router=require('express').Router()
const path=require('path')


router.get('/api/:stock_id',(req,res)=>{
    const stockId=req.params.stock_id;
    const stockImgPath=path.join(__dirname, 'public', 'images', `${stockId}.svg`)
    res.sendFile(stockImgPath)
})

router.get('/api/price/:stock_id/:days',(req,res)=>{
    const {stock_id,days}=req.params;
    const stockPricePath=path.join(__dirname, 'public', 'price-json-files', `${stock_id}.json`);
    const priceJson=require(stockPricePath);
    var today = new Date();
    var priorDate = new Date(new Date().setDate(today.getDate() - parseInt(days)));
    const filteredPriceJson=priceJson.filter((priceObj)=>{
        const date=new Date(priceObj.Date);
        return date>=priorDate;
    })
    console.log(days)
    res.json(filteredPriceJson);
})

router.get('/api/stock-details/:id',(req,res)=>{
    const stockId=req.params.id;
    const stockDetailsPath=path.join(__dirname, 'public', 'stock-details-json-files', `${stockId}.json`);
    const stockDetailsJson=require(stockDetailsPath);
    console.log(stockDetailsJson)
    res.json(stockDetailsJson);
})


router.get('/api/trending-stocks/:id',(req,res)=>{
    const trendingStocksPath=path.join(__dirname, 'public', 'trending-stocks-json-files', `trending-stocks.json`);
    const trendingStocksJson=require(trendingStocksPath);
    res.json(trendingStocksJson);
})

router.get('/api/top-stocks/:id',(req,res)=>{
    const topStocksPath=path.join(__dirname, 'public', 'top-stocks-json-files', `top-stocks.json`);
    const topStocksJson=require(topStocksPath);
    res.json(topStocksJson);
})

module.exports=router