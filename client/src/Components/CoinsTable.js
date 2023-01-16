import { LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { SymbolState } from '../Context/CryptoContext'

export default function CoinsTable(props) {
    const tableHeads=["Stock","Price","24h Change","Market Cap"]
   const navigate=useNavigate();
   const {symbol}=SymbolState()

  return (
    <TableContainer>
        {
            props.loading?<LinearProgress sx={{backgroundColor:"gold"}}></LinearProgress>:
            <Table >
                <TableHead sx={{backgroundColor:"#EEBC1D"}}>
                    <TableRow>
                        {tableHeads.map((head,idx)=>{
                            return <TableCell key={idx} align={head=="Stock"?"left":"center"} sx={{color:"black",fontFamily:" 'Montserrat', sans-serif",fontWeight:"800",fontSize:"1.3vmax"}}>
                                     {head}
                                    </TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.coinsList
                    .slice((props.page-1)*10,(props.page-1)*10+10)
                    .map(coin=>{
                        return <TableRow key={coin.id} className="coinsTableRow" onClick={(e)=>navigate(`/coins/${coin.id}`)}>
                                    <TableCell component="th" scope='row' sx={{display:"flex",alignItems:'center',gap:"1.5vmax"}}>
                                        <img src={coin?.image} alt={coin?.name} className="coinsTableImg" />
                                        <div className="coinsNameContainer">
                                            <span className="coinsTableSymbol">{coin?.symbol?.toUpperCase()}</span>
                                            <span className="coinsTableName">{coin?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell align='center' sx={{fontSize:"1.1vmax"}}>
                                        {`${symbol} ${coin?.current_price?.toLocaleString()}`}
                                    </TableCell>
                                    <TableCell align='center' sx={{fontSize:"1.1vmax"}}>
                                        {
                                            coin?.price_change_percentage_24h>=0 &&  <div className="changeContainer">
                                            <span className="triangleUp"></span>
                                            <span className="percentageChange positiveChange">{coin?.price_change_percentage_24h.toFixed(2)}%</span>
                                            </div>
                                        }
                                        {
                                            coin.price_change_percentage_24h<0 &&  <div className="changeContainer">
                                            <span className="triangleDown"></span>
                                            <span className="percentageChange negativeChange">{coin.price_change_percentage_24h.toFixed(2)}%</span>
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell align='center' sx={{fontSize:"1.1vmax"}}>
                                        {`${symbol} ${(Math.round((coin?.market_cap)/1000000)).toLocaleString()} M`}
                                    </TableCell>
                                </TableRow>
                    })}
                </TableBody>
            </Table>
        }
    </TableContainer>
  )
}
