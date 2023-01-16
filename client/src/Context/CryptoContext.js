
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext } from 'react'
import { useState,useEffect } from 'react';
import { CoinList } from '../Config/api'
import { auth,db} from '../firebase';

export const Crypto= createContext();


function CryptoContext(props) {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹")
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [alert, setAlert] = useState({
      open:false,
      message:"",
      type:"error"
    })
    const [watchlist, setWatchlist] = useState([])
    const [coinId, setCoinId] = useState(null)

    useEffect(() => {
      if(currency==='INR') setSymbol('₹')
      else if (currency==='USD') setSymbol('$')
    }, [currency])
    

    useEffect(() => {
    
      if(user){
        const docRef=doc(db,"watchlist",user?.uid)
        const unsubscribe=onSnapshot(docRef,(doc)=>{
            if(doc.exists()){
              setWatchlist(doc.data()?.coins);
            }
        })
      return () => {
        unsubscribe();
      }
    }
    }, [user])
    

    const fetchCoins=async ()=>{
      setLoading(true);
      const url=CoinList(currency);
      const response=await fetch(url);
      const data=await response.json();
      setCoins(data);
      setLoading(false)
    }

    useEffect(() => {
      fetchCoins()
    }, [currency])

    useEffect(() => {
      onAuthStateChanged(auth,(currentUser)=>{
        if(currentUser) setUser(currentUser)
        else setUser(null)
      })
    }, [])
    
    
  return (
    <Crypto.Provider value={{currency,setCurrency,symbol,setSymbol,coins,loading,fetchCoins,user,setUser,alert,setAlert,watchlist,setWatchlist,coinId,setCoinId}}>
        {props.children}
    </Crypto.Provider>    

  )
}

export default CryptoContext
export const CurrencyState=()=>{
    return useContext(Crypto)
};

export const SymbolState=()=>{
    return useContext(Crypto)
}

export const CryptoState=()=>{
  return useContext(Crypto)
}