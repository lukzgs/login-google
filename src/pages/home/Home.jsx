import React, { useContext } from "react"
import { Context } from "../../context/context"

export const Home = () => {
  const { user, signingOut } = useContext(Context);

  return (
    <>
      <main>
        <h1>Home</h1>
        <h3>Welcome { user.displayName? user.displayName : user.email }</h3>
        <button onClick={ () => signingOut() }>
          Sign Out
        </button>
      </main>
    </>
  )
}