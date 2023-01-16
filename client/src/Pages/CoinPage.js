import { Button, LinearProgress } from '@mui/material';
import HTMLReactParser from 'html-react-parser';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/api';
import { CryptoState, CurrencyState, SymbolState } from '../Context/CryptoContext'
import CoinChart from '../Components/CoinChart';
import {db} from '../firebase'
import { doc,setDoc } from 'firebase/firestore';


export default function CoinPage() {
  const {id}=useParams()
  

  const {currency}=CurrencyState();
  const {symbol}=SymbolState();

  const [coin, setCoin] = useState(null)

  

  const {user,watchlist,coinId,setCoinId,setAlert}=CryptoState()
  useEffect(()=>{
    setCoinId(id)
  })
 

  const fetchCoin=async ()=>{
    const url=SingleCoin(id);
    const response=await fetch(url);
    const data=await response.json();
    setCoin(data);
  }

  useEffect(() => {
      fetchCoin();
  }, [coinId])

  function displayMarketCap(market_cap){
    return symbol+" "+(market_cap).toLocaleString()+" Cr";
  }
  function displayCurrentPrice(current_price){
    return symbol+(current_price).toLocaleString();
  }

  async function handleAddToWatchlist(){
    let isInWatchlist=watchlist.includes(id);
    if(!isInWatchlist){
      const docRef=doc(db,"watchlist",user.uid);
      try{
        await setDoc(docRef,{
          coins: watchlist? [...watchlist,id]:[id]
        })
        setAlert({
          open: true,
          message: `${id.toUpperCase()} added to your Watchlist.
          Click on the profile icon to see your watchlist`,
          type: 'success'
        })
      }
      catch(err){
        setAlert({
          open: true,
          message: String(err.message),
          type: 'error'
        })
      }
      
    }
  }

  async function handleRemoveFromWatchlist(){
   
      const docRef=doc(db,"watchlist",user.uid);
      try{
        await setDoc(docRef,{
          coins: watchlist.filter((coin)=>coin!=id)
        })
        setAlert({
          open: true,
          message: `${id.toUpperCase()} removed from your watchlist.
           Click on the profile icon to see your watchlist`,
          type: 'success'
        })
      }
      catch(err){
        setAlert({
          open: true,
          message: String(err.message),
          type: 'error'
        })
      }
     
  
  }
  
  if(!coin) return (<LinearProgress sx={{backgroundColor:"gold"}}></LinearProgress>)
  return (
   
    <div id="coinPageContainer">
      <div id="coinDescriptionSidebar">
        <img src={coin?.image}  id="sidebarImg" alt={coin?.name} />
        <div id="sidebarName">{coin?.name}</div>
        <div id="sidebarDescription">{coin?.description?.en}</div>
        <div id="sidebarInfoContainer">
          <span className="sidebarInfo"><span className="sidebarInfoHead">{(coin?.id!="nifty50" && coin?.id!="sensex")?"Rank:":"Constituents:"}</span>{(coin?.id!="nifty50" && coin?.id!="sensex")?coin?.market_cap_rank:coin?.constituents}</span>
          <span className="sidebarInfo"><span className="sidebarInfoHead">Current Price:</span>{displayCurrentPrice(coin?.market_data?.current_price[currency?.toLowerCase()])}</span>
          <span className="sidebarInfo"><span className="sidebarInfoHead">{(coin?.id!="nifty50" && coin?.id!="sensex")?"Market Cap:":""}</span>{(coin?.id!="nifty50" && coin?.id!="sensex")?displayMarketCap(coin?.market_data?.market_cap[currency?.toLowerCase()]):coin?.benchmark}</span>
        </div>
        {user && <Button variant='contained' onClick={!watchlist.includes(id)?handleAddToWatchlist: handleRemoveFromWatchlist} id={!watchlist.includes(id)?"addToWatchlistBtn":"removeFromWatchlistBtn"}>{!watchlist.includes(id)?"Add to Watchlist":"Remove From Watchlist"}</Button>}
      </div>
      <CoinChart coin={coin} id={id}/>
    </div>
  )
}
