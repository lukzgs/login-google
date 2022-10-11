import { GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { Context } from "./context"; 

export const Provider = ({ children }) => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageContent = () => {
      const sessionToken = localStorage.getItem('@AuthFirebase: token');
      const sessionUser = localStorage.getItem('@AuthFirebase: user');
      if (sessionToken && sessionUser) { setUser(JSON.parse(sessionUser)) };
    };

    storageContent();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const googleUserData = await auth.signInWithPopup(googleAuthProvider);
      const { credential:{ accessToken: token }, user } = googleUserData;
      setUser(user);  
      localStorage.setItem('@AuthFirebase: token', token);
      localStorage.setItem('@AuthFirebase: user', JSON.stringify(user))
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error);
      console.log(errorCode, errorMessage, email, credential);
    }
  }

  const signOut = () => {
    auth.signOut();
    localStorage.clear();
    setUser(null);
    return <Navigate to='/' />
  }

  const value = {
    user,
    setUser,
    signInWithGoogle,
    signOut,
    signed: !!user,
  }

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider> 
  )
}