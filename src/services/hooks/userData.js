import { useContext, useEffect } from "react"
import {  } from 'react-firebase-hooks/auth'
import { Context } from "../../context/context";
import { firestore } from "../firebase"

export const useUserData =  () => {
  const { username, setUsername, user } = useContext(Context);
  console.log('getUserData:', user, username);
  console.log('usuario: ', user);

  useEffect(() => {
    let unsubscribe;
    console.log('useUserData: ', username)

      if (user) {
        const users = firestore.collection('users').doc(user.uid);
        unsubscribe = users.onSnapshot(
          (doc) => { setUsername( doc.data()?.username) }
        );
      }
      else setUsername(false);
      return unsubscribe;

  }, [setUsername, user, username]);

  return { username, user };
}