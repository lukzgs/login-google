import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { LoginForm } from "../../components/loginForm/LoginForm";
import { Context } from "../../context/context"
import './Login.css';

export const Login = () => {
  const { 
    signInWithGoogle,
    signInWithFacebook,
    // signInWithGithub,
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

  // const btnGitHub = () => {
  //   return (
  //     <button
  //       className="loginBtn loginBtn-github"
  //       onClick={ () => { signInWithGithub() } }
  //       key='github'
  //     >
  //       Sign in with Github
  //     </ button> 
  //   )
  // }

  const loginBtns = () => {
    const buttons = [
      btnGoogle(),
      btnFacebook(),
      // btnGitHub()
    ];
    return buttons
  }

  return (
    <div className="login-page">
      <div className="login-form">
        <LoginForm />
      </div>
      <div className="buttons">
        { !signed ? null : <Navigate to='/home' /> }    
      </div>
    </div>
  )
}