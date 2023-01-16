
import { MenuItem, Select } from '@mui/material'
import { ThemeProvider,createTheme } from '@mui/material/styles';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { CryptoState, CurrencyState,SymbolState} from '../Context/CryptoContext';
import AuthModal from "./AuthModal"
import UserSidebar from "./UserSidebar"

function Header() {
  const navigate= useNavigate();

  function titleClickHandler(e){
    navigate('/')
  }
    const theme = createTheme({
      palette: {
        mode:'dark'
      }
    });

    const {currency,setCurrency}=CurrencyState();
    const {symbol,setSymbol}=SymbolState();
    const {user}=CryptoState();
    console.log(currency,symbol)
  // Auth modal open and close states
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  return (
    <ThemeProvider theme={theme}>
        <nav id="header">
            <span className="appTitle" onClick={titleClickHandler}>Stock Edge</span>
            <div id="headerCorner">
              <Select variant="outlined" value={currency} id="currencySelect" onChange={(e)=>setCurrency(e.target.value)}>
                  <MenuItem className="currencyItem"  value={'INR'}>INR</MenuItem>
                  <MenuItem className="currencyItem"  value={'USD'}>USD</MenuItem>
              </Select>
              {user? <UserSidebar/>:<div id="loginBtn" onClick={handleOpen}>Login</div>}
              
            </div>
            
        </nav>
          <AuthModal open={open} handleClose={handleClose}/>
    </ThemeProvider>
  )
}

export default Header