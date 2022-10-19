import React, { useContext } from "react"
import { Context } from "../../context/context"

export const Home = () => {
  const { user, signOut } = useContext(Context);

  return (
    <>
      <main>
        <h1>Home</h1>
        <h3>Welcome { user.displayName? user.displayName : user.email }</h3>
        <button onClick={ () => signOut() }>
          Sign Out
        </button>
      </main>
    </>
  )
}