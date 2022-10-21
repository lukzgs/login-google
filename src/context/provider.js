/* eslint-disable react/prop-types */
import { 
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';

import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { serverTimestamp, setDoc } from "firebase/firestore";

import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { firestore, auth } from "../services/firebase";
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
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user, 
        user: { accessToken: token, email, displayName, photoURL, uid } 
      } = result;

      setUser(user);
      const userProfileRef = firestore.collection('users').doc(uid);
      await setDoc(userProfileRef, { 
        email,
        name: displayName,
        username: null,
        avatarURL: photoURL,
        createdAt: serverTimestamp(),
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
    const facebookProvider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const { user, 
        user: { accessToken: token, email, displayName, photoURL, uid } 
      } = result;
      setUser(user);
      const userProfileRef = firestore.collection('users').doc(uid);
      await setDoc(userProfileRef, { 
        email,
        name: displayName,
        username: null,
        avatarURL: photoURL,
        createdAt: serverTimestamp(),
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

  const signingOut = () => {
    signOut(auth);
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
    signingOut,
    signed: !!user,
  }

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider> 
  )
}