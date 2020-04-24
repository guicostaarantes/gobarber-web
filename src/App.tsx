import React from 'react';

import Router from './routes';

import GlobalStyle from './styles/global';

import { UserProvider } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';

const App: React.FC = () => (
  <>
    <ToastProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </ToastProvider>
    <GlobalStyle />
  </>
);

export default App;
