import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axios from 'axios';


const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const provider = new GoogleAuthProvider();

   //Register
   const createUser=(email,password)=>{
      setLoading(true);
      return createUserWithEmailAndPassword(auth,email,password);
   }

   //Login
   const signIn=(email,password)=>{
      setLoading(true);
      return signInWithEmailAndPassword(auth,email,password);
   }

   //signInWithGoogle
   const googleSignIn=()=>{
      setLoading(true);
      return signInWithPopup(auth,provider);
   }
   
   //Logout
   const logOut=()=>{
      return signOut(auth);
   }

   //update user profile
   const updateUserProfile=(profile)=>{
      return updateProfile(auth.currentUser,profile);
   }

   //Send a password reset email
   const passwordReset=(email)=>{
     return sendPasswordResetEmail(auth,email);
   }

   //Observer
   useEffect(()=>{
      const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
         setUser(currentUser);
         setLoading(false);
      })
      return ()=>{
         unsubscribe();
      }
   },[])

    const authInfo={
       user,
       loading,
       createUser,
       signIn,
       googleSignIn,
       logOut,
       updateUserProfile,
       setLoading,
       passwordReset
    }

    return (
       <AuthContext value={authInfo}>
          {children}
       </AuthContext>
    );
};

export default AuthProvider;