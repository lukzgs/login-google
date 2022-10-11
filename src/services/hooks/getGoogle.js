import { GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { useContext } from "react";
import { Context } from "../../context/context";
import { auth } from '../../services/firebase'


export const GoogleLogin = ({ children }) => {
  const { setUser } = useContext(Context);
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const googleUserData = await auth.signInWithPopup(googleAuthProvider);
      const { credential:{ accessToken: token }, user } = googleUserData;
      setUser(user);
      sessionStorage.setItem('@AuthFirebase: token', token);
      sessionStorage.setItem('@AuthFirebase: user', JSON.stringify(user))
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
}