import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { Context } from "../../context/context"
import { firestore } from "../../services/firebase";
import { useUserData } from "../../services/hooks/userData";
import './Home.css'

export const Home = () => {
  const { user, signOut } = useContext(Context);

  const getUserData = useUserData();
  const { username } = getUserData;

  return (
    <>
      <main>
        <h1>Home</h1>
        <h3>Welcome { user.displayName }</h3>
        { username === null ? 
            'loading...' : 
            username ? 
              null : <Navigate to='/username' /> }

        <button onClick={ () => signOut() }>
          Sign Out
        </button>
      </main>
    </>
  )
}