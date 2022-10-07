import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { Context } from "../../context/context"
import { firestore } from "../../services/firebase";
import './Home.css'

export const Home = () => {
  const { user, signOut } = useContext(Context);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      const userData = firestore.collection('users').doc(user.uid);
      unsubscribe = userData.onSnapshot(
        (doc) => { 
          setUsername(doc.data()?.username);
        }
      );
    }
    else { setUsername(false) };
    return unsubscribe;
  }, [user]);

  return (
    <>
      <main>
        <h1>Home</h1>
        <h3>Welcome { user.displayName }</h3>
        { username === null ? 
          'loading...' : username  ? null : <Navigate to='/username' /> }

        <button onClick={ () => signOut() }>
          Sign Out
        </button>
      </main>
    </>
  )
}