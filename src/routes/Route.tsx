import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useUser } from '../context/UserContext';

interface MyRouteProps extends RouteProps {
  component: React.ComponentType;
}

export const ProtectedRoute: React.FC<MyRouteProps> = ({
  component: Component,
  ...otherProps
}) => {
  const { token } = useUser();

  return (
    <Route
      {...otherProps}
      render={() => {
        return token ? <Component /> : <Redirect to="/signin" />;
      }}
    />
  );
};

export const OnlyPublicRoute: React.FC<MyRouteProps> = ({
  component: Component,
  ...otherProps
}) => {
  const { token } = useUser();

  return (
    <Route
      {...otherProps}
      render={() => {
        return token ? <Redirect to="/" /> : <Component />;
      }}
    />
  );
};
