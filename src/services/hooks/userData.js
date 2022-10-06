import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { useEffect, useState } from 'react';

export const useUserData = () => {
  const [ user ] = useAuthState(auth);
  const [ username, setUsername ] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const users = firestore.collection('users').doc(user.uid);
      unsubscribe = users.onSnapshot(
        (info) => { setUsername(info.data()?.username) }
      );
    }
    else { setUsername(null) };
    
    return unsubscribe;
  }, [user]);

  return { user, username };
}