import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/context';
import { Navbar } from '../../components/navbar/Navbar';

export const Home = () => {
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    const storageContent = () => {
      const localToken = localStorage.getItem('@AuthFirebase: token');
      const localUser = localStorage.getItem('@AuthFirebase: user');
      if (localToken && localUser) { setUser(JSON.parse(localUser)); }
    };

    storageContent();
  }, []);

  return (
    <div className='bg-gray-200'>
      <Navbar />
      <main className='w-screen h-screen'>
        <div className='pt-20 p-4 h-screen'>
          <h1>Home</h1>
          <h3>Welcome { user.displayName? user.displayName : user.email }</h3>
          </div>
      </main>
    </div>
  );
};