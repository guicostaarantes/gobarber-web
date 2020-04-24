import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GlobalStyle from './styles/global';

import { UserProvider } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <ToastProvider>
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </ToastProvider>
    <GlobalStyle />
  </>
);

export default App;
