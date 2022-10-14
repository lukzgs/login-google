import { sendEmailVerification } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { Context } from '../../context/context';
import { auth } from '../../services/firebase';


export const SignUp = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <>
      <div className="signup-page">
        <div className="signup-form"/>
      </div>

      <div className="text-center mt-16"
        id='title'
      >
        <div className="flex items-center justify-center">
          <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
            <path strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h2 className="text-4xl tracking-tight">
          Sign up your account
        </h2>
      </div>

      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form 
          id='login-card'
          className="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email address</label>
              <input
                id='email'
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type='email'
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                required />
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Password</label>
              <input 
              className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              type='password'
              value={ password }
              onChange={ (e) => {
                setPassword(e.target.value);
                console.log(password);
              }}
              required />
            </div>

            <div className="w-full md:w-full px-3 mb-3 mt-6">
              <button className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">Sign in</button>
            </div>
           
          </div>
        </form>
      </div>
      </>
  )
}
