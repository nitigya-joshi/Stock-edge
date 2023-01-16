import React from 'react'
import { CryptoState, SymbolState } from '../Context/CryptoContext'
import {AiFillDelete} from 'react-icons/ai'
import {useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function WatchlistItem({coin,toggleDrawer}) {
  const {symbol}=SymbolState()
  const {user,watchlist,setAlert}=CryptoState()
  
  const navigate=useNavigate()
  function handleItemClick(){
    navigate(`/coins/${coin.id}`)
    toggleDrawer('right',false);
  }

  async function removeFromWatchlist(coin){
    const docRef=doc(db,"watchlist",user.uid);

    try{
      await setDoc(docRef,{
        coins: watchlist.filter(list=>list!=coin)
      })
      setAlert({
        open: true,
        message: `${coin.toUpperCase()} removed from your Watchlist`,
        type: 'success'
      })
    }
    catch(err){
      setAlert({
        open: true,
        message: err.message,
        type: 'error'
      })
    }
  }
  return (
    <div className='watchlistItem' onClick={handleItemClick}>
      <span className="watchlistItemName">{coin.name}</span>
      <span className="watchlistItemCorner">
        <span className="watchlistItemPrice">{`${symbol}${coin.current_price.toLocaleString()}`}</span>
        <AiFillDelete className='watchlistItemDeleteIcon' onClick={()=>{removeFromWatchlist(coin.id)}}/>
      </span>
    </div>
  )
}
