import { useContext } from "react"
import { Context } from "../../context/context"

export const Home = () => {
  const { user, signOut } = useContext(Context);
  return (
    <>
      <h1>Home</h1>
      <h3>Welcome { user.displayName }</h3>
      <button onClick={ () => signOut() }>
        Sign Out
      </button>
    </>
  )
}