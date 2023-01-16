import React from 'react'
import "../App.css"
import { SymbolState } from '../Context/CryptoContext'

export default function TrendingListItem(props) {
    const {symbol}=SymbolState()
  return (
    <div className="trendingItem">
        <img src={props.coin.image} alt={props.coin.name} className="itemImage"/>
       
        <span className="symbol">{props.coin.symbol.toUpperCase()}</span>
        
        {
           props.coin.price_change_percentage_24h>=0 &&  <div className="changeContainer">
           <span className="triangleUp"></span>
           <span className="percentageChange positiveChange">{props.coin?.price_change_percentage_24h}%</span>
         </div>
        }
         {
           props.coin.price_change_percentage_24h<0 &&  <div className="changeContainer">
           <span className="triangleDown"></span>
           <span className="percentageChange negativeChange">{props.coin?.price_change_percentage_24h}%</span>
         </div>
        }
    
        <div className="itemPrice">{`${symbol} ${props.coin?.current_price.toLocaleString()}`}</div>
       
    </div>
  )
}
