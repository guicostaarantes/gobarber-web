import React from 'react';

import GlobalStyle from './styles/global';

import { UserProvider } from './context/UserContext';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <UserProvider>
      <SignIn />
      <SignUp />
    </UserProvider>
    <GlobalStyle />
  </>
);

export default App;
