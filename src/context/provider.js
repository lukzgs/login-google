/* eslint-disable react/prop-types */
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { setDoc } from "firebase/firestore";


import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { auth, firestore } from "../services/firebase";
import { Context } from "./context"; 

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageContent = () => {
      const sessionToken = localStorage.getItem('@AuthFirebase: token');
      const sessionUser = localStorage.getItem('@AuthFirebase: user');
      if (sessionToken && sessionUser) { setUser(JSON.parse(sessionUser)) }
    };

    storageContent();
  }, []);

  const signInWithGoogle = async () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    try {
      const googleUserData = await auth.signInWithPopup(googleAuthProvider);
      const { credential:{ accessToken: token }, user } = googleUserData;
      const { email, displayName } = user.multiFactor.user;
      setUser(user);
      const userProfileRef = firestore.collection('users').doc( user.uid );
      await setDoc(userProfileRef, { 
        email,
        name: displayName,
        username: null,
        avatarPhoto: null,
        createdAt: Date.now(),
        status: 'pending',
      });
      localStorage.setItem('@Google: token', token);
      localStorage.setItem('@Google: user', JSON.stringify(user))
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error);
      console.log(errorCode, errorMessage, credential);
    }
  }

  // const signUpAccount = async (email, password) => {
  //   const newUser = await createUserWithEmailAndPassword(email, password);
  //   console.log('newuser:', newUser);
  //   const userProfileRef = firestore.collection('users').doc( newUser.uid );
  //   console.log('user profile:', userProfileRef);
  //   await setDoc(userProfileRef, { 
  //     email,
  //     name: null,
  //     username: null,
  //     avatarPhoto: null,
  //     createdAt: Date.now(),
  //     status: 'pending',
  //   });
  //   console.log('new user:', newUser);
  //   console.log('ref: ', userProfileRef);
  // }

  const signInWithFacebook = async () => {
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    try {
      const facebookUserData = await auth.signInWithPopup(facebookAuthProvider);
      const { credential:{ accessToken: token }, user } = facebookUserData;
      const { email, displayName } = user.multiFactor.user;
      setUser(user);
      const userProfileRef = firestore.collection('users').doc( user.uid );
      await setDoc(userProfileRef, { 
        email,
        name: displayName,
        username: null,
        avatarPhoto: null,
        createdAt: Date.now(),
        status: 'pending',
      });
      localStorage.setItem('@Facebook: token', token);
      localStorage.setItem('@Facebook: user', JSON.stringify(user))
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.error(error);
      console.log(errorCode, errorMessage, credential);
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