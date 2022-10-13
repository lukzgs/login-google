import { useContext } from "react"
import { Context } from "../../context/context"
import './Home.css'

export const Home = () => {
  const { user, signOut } = useContext(Context);
  return (
    <>
      <main>
        <h1>Home</h1>
        <h3>Welcome { user.displayName }</h3>
        <button onClick={ () => signOut() }>
          Sign Out
        </button>
      </main>
    </>
  )
}