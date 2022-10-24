/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../context/context';
import { auth, firestore, db } from '../../services/firebase';

import debounce from 'lodash.debounce';
import { 
  addDoc, setDoc, getDoc, getDocs,
  collection, onSnapshot, serverTimestamp 
} from 'firebase/firestore';

import {
  createUserWithEmailAndPassword, sendEmailVerification,
} from 'firebase/auth';

export const Register = () => {
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { setUser } = useContext(Context);
  const [ isValid, setIsValid ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  
  useEffect(() => {
    checkEmail(email);
  }, [email]);
  const signUpAccount = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result.error);
      console.log(result.user);

      if (result) {
        const { user, 
          user: { accessToken: token, email: userEmail, displayName, photoURL, uid } 
        } = result;
        setUser(user);
        const usersRef = collection(db, 'users');
        console.log(result);
        await addDoc(usersRef, {
          email: userEmail,
          name: null,
          username: null,
          avatarURL: null,
          createdAt: serverTimestamp(),
          status: 'pending',
        })
        localStorage.setItem('@Facebook: token', token);
        localStorage.setItem('@Facebook: user', JSON.stringify(user))
      }
    }
    catch(error) {
      console.error(error);
    }    
  }

  // TO DO:
  // FAZER A PARTE DE USERNAME E FULL NAME
  // const onChangeUsername = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   const regex = /^[a-zA-Z0-9]+$/;

  //   setUsername(value);
  //   setIsLoading(true);
  //   setIsValid(false);

  //   if (regex.test(value)) {
  //     setUsername(value);
  //     setIsLoading(true);
  //     setIsValid(false);
  //   }
  // };

  // const onChangeName = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   const regex = /^[a-zA-Z-]+$/;

  //   setName(value);
  //   setIsValid(false);

  //   if (regex.test(value)) {
  //     setName(value);
  //     setIsValid(false);
  //   }
  // };

  // const onChangeEmail = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   setEmail(value);
  //   setIsLoading(true);
  //   setIsValid(false);

  //   if (regex.test(value)) {
  //     setEmail(value);
  //     setIsLoading(true);
  //     setIsValid(false);
  //   }
  // };

  const checkEmail = useCallback(
    debounce(async () => {
      const ref = firestore.collection('users');
      const { exists } = await ref.get();
      console.log('Firestore read executed!');
      setIsValid(!exists);
      setIsLoading(false);
    }, 500),
    []
  );

  //   function Avalability ({ value, isValid, isLoading }) {
  //     if (isLoading) {
  //       return <p>Checking...</p>;
  //     } else if (isValid) {
  //       return <p className="text-success">{ value } is available!</p>;
  //     } else if (value && !isValid) {
  //       return <p className="text-danger">{ value } is taken!</p>;
  //     } else {
  //       return <p></p>;
  //     }
  //   }

  // if (error) {
  //   return (
  //     <div>
  //       <p>Error: { error.message }</p>
  //     </div>
  //   );
  // }
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (user) {
  //   return (
  //     <div>
  //       { setUser(user.user) }
  //       <p>Registered User: { user.user.email }</p>
  //       <Navigate to='/home' />
  //     </div>
  //   );
  // }


  return (
    <>
      <div 
        className="text-center mt-24"
        id='title'
      >
        <div className="flex items-center justify-center">
          <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
            <path strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>

        <h2 className="text-4xl tracking-tight">
          Register your account
        </h2>

        <br />
        <br />
      </div>

      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form 
          id='login-card'
          className="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex flex-wrap -mx-3 mt-6 mb-6">
            {/* to do */}

            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Username</label>
              <input
                id='username'
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type='username'
                // onChange={ onChangeUsername }
                // required 
              />
              {/* { username.length === 0 ? null :
                <Avalability 
                  value={ username }
                  isValid={ isValid }
                  isLoading={ isLoading }
                /> 
              } */}
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Full Name</label>
              <input
                id='name'
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type='Full name'
                // onChange={ onChangeName }
                // required 
              />
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email address</label>
              <input
                id='email'
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type='email'
                onChange={ (e) => {
                  setEmail(e.target.value);
                }}
                required />
              {/* { email.length === 0 ? null :
                <Avalability 
                  email={ email }
                  isValid={ isValid }
                  isLoading={ isLoading }
                /> 
              } */}
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Password</label>
              <input 
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type='password'
                onChange={ (e) => {
                  setPassword(e.target.value);
                }}
              required />
            </div>

            <div className="w-full flex items-center justify-between px-3 mb-3 ">
              <label className="flex items-center w-1/2">
              </label>
              <div>
                <br />
              </div>
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <button 
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
                onClick= { (e) => { signUpAccount(e) } }
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
};