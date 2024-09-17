import 'firebase/compat/auth';
import 'firebase/compat/storage';

import React, { useEffect, useState } from 'react';
import { useUserData } from '../services/hooks/userData';
import { Context } from './context'; 

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserData = useUserData();
  // not working I think
  useEffect(() => {
    const storageContent = () => {
      const localToken = localStorage.getItem('@AuthFirebase: token');
      const localUser = localStorage.getItem('@AuthFirebase: user');
      if (localToken && localUser) { setUser(JSON.parse(localUser)); }
    };

    storageContent();
  }, []);

  const value = {
    user,
    setUser,
    signed: !!user,
  };

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider> 
  );
};