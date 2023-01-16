
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import { CryptoState } from '../Context/CryptoContext'
import { auth } from '../firebase'
import CustomTextField from './CustomTextField'

export default function Login({handleClose,googleProvider}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {setAlert}=CryptoState()


    const handleAuthClick=async()=>{
      if(email==="" || password===""){
        setAlert({
          open: true,
          message: "All fields are required",
          type: "error"
        })
        
        return;
      }
      try{
        const userCredentials=await signInWithEmailAndPassword(auth,email,password);
        console.log(userCredentials.user);
        setAlert({
          open: true,
          message: `Login Successful. Welcome ${userCredentials.user.email}`,
          type :"success"
        })
        
        handleClose()
      }
      catch(err){
        setAlert({
          open: true,
          message : err.message,
          type: "error"
        })
   
      }
    }

    function handleGoogleLogIn(){
      signInWithPopup(auth,googleProvider).then((result)=>{
        // const credentials=GoogleAuthProvider.credentialFromResult(result);
        // const token= credentials.accessToken;
        const user=result.user
       
        setAlert({
          open: true,
          message: `LogIn Successfull. Welcome ${user.displayName}`,
          type: `success` 
        })
        handleClose()
      }).catch((err)=>{

      })
    }
  return (
    <div id="loginContainer">
        <CustomTextField type="email" value={email} setValue={setEmail} text="Enter Your Email"/>
        <CustomTextField type="password" value={password} setValue={setPassword} text="Enter Your Password"/>
        <div className="authBtn" onClick={handleAuthClick}>Login</div>
        <div className="orText">OR</div>
        <GoogleButton className='googleBtn' onClick={handleGoogleLogIn}/>
    </div>
  )
}
