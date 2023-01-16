import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import { CryptoState } from '../Context/CryptoContext';
import Watchlist from './Watchlist';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


export default function UserSidebar() {
   const {user,setAlert}=CryptoState()
    
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogOut=async()=>{
    await signOut(auth);
    
    setAlert({
        open: true,
        message: "Logged Out Successfully",
        type: "success"
    })
    toggleDrawer('right',false)
  }
  
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar src={user.photoURL} alt={user.displayName || user.email} id="profileAvatar"
            onClick={toggleDrawer(anchor, true)}/>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{width:"fit-content"}}
          >
           <div id="userSideBarContainer">
                <div id="profile">
                    <Avatar src={user.photoURL} id="sidebarProfileAvatar"/>
                    <span id="profileName">{user.displayName || user.email}</span>
                </div>
                <Watchlist toggleDrawer={toggleDrawer}/>
           </div>
           <Button variant='contained' className='logoutBtn' onClick={handleLogOut}>Log Out</Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}