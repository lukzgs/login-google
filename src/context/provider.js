import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { Context } from './context'; 

import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


export const Provider = ({ children }) => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const storageContent = () => {
      const sessionToken = sessionStorage.getItem('@AuthFirebase: token');
      const sessionUser = sessionStorage.getItem('@AuthFirebase: user');
      if (sessionToken && sessionUser) { setUser(JSON.parse(sessionUser)) };
    };

    storageContent();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const googleUsarData = await auth.signInWithPopup(googleAuthProvider);
      const { credential:{ accessToken: token }, user } = googleUsarData;
      setUser(user);  
      sessionStorage.setItem('@AuthFirebase: token', token);
      sessionStorage.setItem('@AuthFirebase: user', JSON.stringify(user));
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error);
      console.log(errorCode, errorMessage, credential);
    }
  }

  const signOut = () => {
    auth.signOut();
    sessionStorage.clear();
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