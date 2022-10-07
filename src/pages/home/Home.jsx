import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { Context } from "../../context/context"
import './Home.css'

export const Home = () => {
  const { username, user, signOut } = useContext(Context);
  return (
    <>
      <main>
        <h1>Home</h1>
        <h3>Welcome { user.displayName }</h3>
        { username ? null : <Navigate to='/username' /> }
        <button onClick={ () => signOut() }>
          Sign Out
        </button>
      </main>
    </>
  )
}