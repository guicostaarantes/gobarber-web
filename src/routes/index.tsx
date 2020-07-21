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
import Procedures from '../pages/Procedures';
import Vacancies from '../pages/Vacancies';

const Router: React.FC = () => {
  const { token, getUser, getSupplier, signOut } = useUser();
  const { addToast } = useToast();

  const [lastToken, setLastToken] = useState('');

  useEffect(() => {
    if (token && token !== lastToken) {
      getUser().catch(() => {
        signOut();
        addToast({
          title: 'Sessão expirada',
          description: 'Insira suas credenciais para entrar novamente.',
        });
      });
      getSupplier();
    }
    setLastToken(token);
  }, [token, lastToken, getUser, getSupplier, signOut, addToast]);

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
        <ProtectedRoute exact path="/procedures" component={Procedures} />
        <ProtectedRoute exact path="/vacancies" component={Vacancies} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
