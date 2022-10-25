/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { 
  signOut,
} from 'firebase/auth';

import 'firebase/compat/auth';
import 'firebase/compat/storage';

import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { Context } from "./context"; 

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageContent = () => {
      const localToken = localStorage.getItem('@AuthFirebase: token');
      const localUser = localStorage.getItem('@AuthFirebase: user');
      if (localToken && localUser) { setUser(JSON.parse(localUser)) }
    };

    storageContent();
  }, []);

  const value = {
    user,
    setUser,
    // signInWithGoogle,
    // signInWithFacebook,
    // signInWithGithub,
    // signingOut,
    signed: !!user,
  }

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider> 
  )
}