import { useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../../context/context';
import { auth } from '../firebase';

export const useGetUsername = async () => {
  const [ user ] = useAuthState(auth);
  const { username } = useContext(Context);
    console.log(user, username)
  return username;
}