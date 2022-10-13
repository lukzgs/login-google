import { sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';


export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth, sendEmailVerification);

  if (error) {
    return (
      <div>
        <p>Error: { error.message }</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Registered User: { user.email }</p>
      </div>
    );
  }
  return (
    <div className='login-form'>
      <input
        type='email'
        placeholder='email'
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button onClick={ () => createUserWithEmailAndPassword(email, password) }>
        Register
      </button>
    </div>
  );
};