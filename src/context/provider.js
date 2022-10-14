import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { Context } from "./context"; 

export const Provider = ({ children }) => {
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
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    try {
      const googleUserData = await auth.signInWithPopup(googleAuthProvider);
      const { credential:{ accessToken: token }, user } = googleUserData;
      setUser(user);  
      localStorage.setItem('@Google: token', token);
      localStorage.setItem('@Google: user', JSON.stringify(user))
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

  const signInWithFacebook = async () => {
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    try {
      const googleUserData = await auth.signInWithPopup(facebookAuthProvider);
      const { credential:{ accessToken: token }, user } = googleUserData;
      setUser(user);  
      localStorage.setItem('@Facebook: token', token);
      localStorage.setItem('@Facebook: user', JSON.stringify(user))
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.error(error);
      console.log(errorCode, errorMessage, email, credential);
    }
  }

  // const signInWithGithub = async () => {
  //   const githubAuthProvider = new firebase.auth.GithubAuthProvider();
  //   try {
  //     const googleUserData = await auth.signInWithPopup(githubAuthProvider);
  //     const { credential:{ accessToken: token }, user } = googleUserData;
  //     setUser(user);  
  //     localStorage.setItem('@Github: token', token);
  //     localStorage.setItem('@Github: user', JSON.stringify(user))
  //   }
  //   catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     const email = error.customData.email;
  //     const credential = FacebookAuthProvider.credentialFromError(error);
  //     console.error(error);
  //     console.log(errorCode, errorMessage, email, credential);
  //   }
  // }

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
    signInWithFacebook,
    // signInWithGithub,
    signOut,
    signed: !!user,
  }

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider> 
  )
}