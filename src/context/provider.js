import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { app } from "../services/firebase";
import { Context } from "./context"; 

export const Provider = ({ children }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageContent = () => {
      const sessionToken = sessionStorage.getItem('@AuthFirebase: token');
      const sessionUser = sessionStorage.getItem('@AuthFirebase: user');
      if (sessionToken && sessionUser) { setUser(JSON.parse(sessionUser)) };
    };

    storageContent();
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
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