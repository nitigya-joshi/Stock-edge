import { Snackbar } from '@mui/material'
import React from 'react'

import MuiAlert from '@mui/material/Alert';
import { CryptoState } from '../Context/CryptoContext';

export default function Alert() {
   const {alert,setAlert}=CryptoState()
   const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({open:false});
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}
     anchorOrigin={{vertical:"bottom",horizontal:"center"}}>
        <MuiAlert variant='filled' severity={alert.type}>
            {alert.message}
        </MuiAlert>
    </Snackbar>
  )
}
