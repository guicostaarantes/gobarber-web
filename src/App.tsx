import React from 'react';

import GlobalStyle from './styles/global';

import { UserProvider } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <ToastProvider>
      <UserProvider>
        <SignIn />
        <SignUp />
      </UserProvider>
    </ToastProvider>
    <GlobalStyle />
  </>
);

export default App;
