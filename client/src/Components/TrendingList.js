import axios from 'axios';
import React, { useState,useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingStocks } from '../Config/api';
import { CurrencyState } from '../Context/CryptoContext'
import TrendingListItem from './TrendingListItem';


export default function TrendingList() {
    const {currency}=CurrencyState();
    const [trendingCoins, setTrendingCoins] = useState([])
    async function fetchTrendingList(){
      const {data}=await axios.get(TrendingStocks())
      
      setTrendingCoins(data);
    }
    useEffect(() => {
     fetchTrendingList()
    }, [currency])
    

    const responsive={
      0:{
        items: 2
      },
      512:{
        items: 4
      },
      786:{
        items: 5
      }
    }

    const items= trendingCoins.map((coin)=>{
      return (<Link to={`/coins/${coin.id}`} key={coin.id}>
        <TrendingListItem coin={coin}/>
      </Link>)
    })
    
  return (
    <div id="trendingListContainer">
      <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500}
       responsive={responsive} autoPlay disableDotsControls disableButtonsControls
       items={items} />
    </div>
  )
}
