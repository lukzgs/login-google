import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';

export const useUserData = () => {
  const [ user ] = useAuthState(auth);
  const [ username, setUsername ] = useState(null);

  useEffect(() => {
    console.log(user);
    // let unsubscribe;

    // if (user) {
    //   const users = firestore.collection('users').doc(user.uid);
    //   unsubscribe = users.onSnapshot((doc) => { setUsername(doc.data()?.username);});
    // }
    // else { setUsername(null); }
    
    // return unsubscribe;
  }, [user]);

  // return { user, username };
  return console.log(user);

};