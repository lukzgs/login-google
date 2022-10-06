import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { Context } from "../../context/context"

export const Login = () => {
  const { signInWithGoogle, signed } = useContext(Context);

  async function signInGoogle() {
    await signInWithGoogle();
  }

  if (!signed){
    return (
      <button onClick={ () => { signInGoogle() } }>
        Sign in with Google
      </ button> 
    )
  } else 
    return <Navigate to='/home' />
}