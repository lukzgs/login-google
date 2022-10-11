import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { Context } from "../../context/context"
import './Home.css'

export const Home = () => {
  const { user, signOut, userData, username } = useContext(Context);
  console.log('username: ', username);

  return (
    <>
      { user ? ( 
        <main>
          <h1>Home</h1>
          <h3>Welcome { user.displayName }</h3>
          { username === null ?
            null :
            ( username === false ? ( <Navigate to='/username' /> ) : 
            console.log('não pegou false, portanto AQUI É HOME')) 
          }
          <button onClick={ () => signOut() }>
            Sign Out
          </button>
        </main>
      ) 
      : '...loading' }
      
    </>
  )
}