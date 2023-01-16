import React from 'react'
import { CryptoState } from '../Context/CryptoContext'
import WatchlistItem from './WatchlistItem'

export default function Watchlist({toggleDrawer}) {
  const {watchlist,coins}=CryptoState();
  
  return (
    <div className='watchlist'>
        <span className="watchlistHeader">Watchlist</span>
        <div className="watchlistItemContainer">
          {coins.filter((coin)=>watchlist.includes(coin.id)).map((coin)=>{
            return <WatchlistItem key={coin.id} coin={coin} toggleDrawer={toggleDrawer}/>
          })}
        </div>
    </div>
  )
}
