import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
      const sessionToken = sessionStorage.getItem('@AuthFirebase: token');
      const sessionUser = sessionStorage.getItem('@AuthFirebase: user');
      if (sessionToken && sessionUser) { setUser(sessionUser) };
    };

    storageContent();
  }, []);

  const signInWithGoogle = async () => {
    const getUser = await auth.signInWithPopup( googleAuthProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(user);
      sessionStorage.setItem('@AuthFirebase: token', token);
      sessionStorage.setItem('@AuthFirebase: user', JSON.stringify(user));

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  const signOut = () => {
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