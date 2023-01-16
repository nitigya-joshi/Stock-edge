import {react,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../App.css"
import { Tab, Tabs } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import { GoogleAuthProvider } from 'firebase/auth';



export default function AuthModal({open,handleClose}) {
  
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange=(_,value)=>{
    setCurrentTab(value);
  }

  const googleProvider=new GoogleAuthProvider()


  return (
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="modal"
      >
        <Box id="modalBox">
          <Tabs value={currentTab} variant="fullWidth" id="modalTabContainer" onChange={handleTabChange} sx={{width:"100%",display:"flex",justifyContent:"center",alignItem:"center"}}>
            <Tab label="Login" className="modalTab" />
            <Tab label="Sign Up" className="modalTab"/>
          </Tabs>
          {currentTab==0 && <Login handleClose={handleClose} googleProvider={googleProvider}/>}
          {currentTab==1 && <SignUp handleClose={handleClose} googleProvider={googleProvider}/>}
          
        </Box>
      </Modal>

  );
}
