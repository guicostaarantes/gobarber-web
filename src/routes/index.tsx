import React, { useEffect, useState } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ProtectedRoute, OnlyPublicRoute } from './Route';

import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';

import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const Router: React.FC = () => {
  const { token, getUser, signOut } = useUser();
  const { addToast } = useToast();

  const [lastToken, setLastToken] = useState('');

  useEffect(() => {
    if (token && token !== lastToken) {
      getUser(token).catch(() => {
        signOut();
        addToast({
          title: 'Sessão expirada',
          description: 'Insira suas credenciais para entrar novamente.',
        });
      });
    }
    setLastToken(token);
  }, [token, lastToken, getUser, signOut, addToast]);

  return (
    <BrowserRouter>
      <Switch>
        <OnlyPublicRoute exact path="/signup" component={SignUp} />
        <OnlyPublicRoute exact path="/signin" component={SignIn} />
        <OnlyPublicRoute
          exact
          path="/forgot-password"
          component={ForgotPassword}
        />
        <OnlyPublicRoute
          exact
          path="/reset-password"
          component={ResetPassword}
        />
        <ProtectedRoute exact path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
