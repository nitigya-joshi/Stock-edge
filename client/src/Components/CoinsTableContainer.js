import { ThemeProvider,createTheme } from '@mui/material/styles';
import { Pagination, TextField } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { CryptoState, CurrencyState } from '../Context/CryptoContext'
import CoinsTable from './CoinsTable'


export default function CoinsTableContainer() {

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const {currency,coins,loading,fetchCoins}=CryptoState();

  
  
  const theme = createTheme({
    palette: {
      mode:'dark'
    }
  });

  const handleSearch=()=>{
      return coins.filter(coin=>{
        return (coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()));
      }) 
  }

  return (
    <ThemeProvider theme={theme}>
      <div id="coinsTableContainer">
        <span id="coinsTableHead">Top Indian stocks</span>
        <TextField id="coinsTableSearch" label="Search For To Stocks..." variant='outlined' sx={{width:"100%"}}
          value={search} onChange={(e)=>setSearch(e.target.value)}></TextField>
        <CoinsTable loading={loading} coinsList={handleSearch()} page={page}></CoinsTable>
        <Pagination count={Math.round((handleSearch()?.length/10))}
          sx={{width:"100%",display:"flex",justifyContent:"center"}}
          size="large"
          onChange={(_,value)=>{
            setPage(value);
            window.scroll(0,450);
          }}></Pagination>  
      </div>
    </ThemeProvider>
  )
}
