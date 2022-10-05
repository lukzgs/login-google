import { useContext } from "react"
import { Navigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Context } from "../../context/context"
import './Login.css';

export const Login = () => {
  const { signInWithGoogle, signed } = useContext(Context);

  async function signInGoogle() {
    await signInWithGoogle();
  }

  const btnGoogle = () => {
    return (
      <button
        className="loginBtn loginBtn-google"
        onClick={ () => { signInGoogle() } }
        key='google'
      >
        Sign in with Google
      </ button> 
    )
  }

  const loginBtns = () => {
    const buttons = [btnGoogle()];
    return buttons
  }

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-form">
          <div className="buttons">
            { !signed ? loginBtns(): <Navigate to='/home' /> }    
          </div>
        </div>
      </div>
    </>
  )
}