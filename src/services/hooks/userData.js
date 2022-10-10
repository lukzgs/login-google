import { useEffect, useState } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from "../firebase"

export const useUserData = () => {
  const [ user ] = useAuthState(auth);
  const [ username, setUsername ] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const getUserData = async () => {
      if (user) {
        const users = firestore.collection('users').doc(user.uid);
        unsubscribe = users.onSnapshot(
          async (doc) => { setUsername( await doc.data()?.username) }
        );
      }
      else if (username) { return username }
      else { setUsername(false) };
      
      return unsubscribe;
    }

    getUserData();
  }, [user]);

  return { username, user };
}