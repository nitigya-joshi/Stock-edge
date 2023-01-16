import React, { useState } from 'react'
import CustomTextField from './CustomTextField'
import { CryptoState } from '../Context/CryptoContext'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import GoogleButton from 'react-google-button'

export default function SignUp({handleClose,googleProvider}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    

    const {setAlert}= CryptoState()

    const handleAuthClick=async ()=>{
      if(password!=confirmPassword){
        setAlert({
          open:true,
          message:"Passwords do not match",
          type:"error"
        })
        return;
      }
      try{
        const userCredentials= await createUserWithEmailAndPassword(auth,email,password)
        
        setAlert({
          open: true,
          message : `Sign Up Successful. Welcome ${userCredentials.user.email}`,
          type: "success"
        })
        handleClose()
      }
      catch(err){
        console.log(err)
        setAlert({
          open: true,
          message : err.message,
          type: "error"
        })
      }
      
    }

    function handleGoogleSignUp(){
      
      signInWithPopup(auth,googleProvider).then((result)=>{
        // const credentials=GoogleAuthProvider.credentialFromResult(result);
        // const token= credentials.accessToken;
        const currentUser=result.user
        
        setAlert({
          open: true,
          message: `Sign Up Successfull. Welcome ${currentUser.displayName}`,
          type: `success` 
        })
        handleClose()
      }).catch((err)=>{

      })
    }

  return (
    <div id="signinContainer">
        <CustomTextField type="email" value={email} setValue={setEmail} text="Enter Your Email"/>
        <CustomTextField type="password" value={password} setValue={setPassword} text="Enter Your Password"/>
        <CustomTextField type="password" value={confirmPassword} setValue={setConfirmPassword} text="Confirm Password"/>
        <div className="authBtn" onClick={handleAuthClick}>Sign Up</div>
        <div className="orText">OR</div>
        <GoogleButton className='googleBtn' onClick={handleGoogleSignUp}/>
    </div>
  )
}
