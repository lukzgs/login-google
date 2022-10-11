import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { Context } from "../../context/context"
import './Login.css';

export const Login = () => {
  const { 
    signInWithGoogle,
    signInWithFacebook,
    signed } = useContext(Context);

  async function signInGoogle() {
    await signInWithGoogle();
  }

  const btnFacebook = () => {
    return (
      <button
        className="loginBtn loginBtn-facebook"
        onClick={ () => { signInWithFacebook() } }
        key='facebook'
      >
        Sign in with Facebook
      </ button> 
    )
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
    const buttons = [btnGoogle(), btnFacebook()];
    return buttons
  }

  return (
    <>
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