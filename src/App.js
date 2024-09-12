import React from 'react';
import { Provider } from './context/provider';
import { AppRoutes } from './routes/routes';

import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <Provider>
      <AppRoutes />
      <Toaster />
    </Provider>
  );
};