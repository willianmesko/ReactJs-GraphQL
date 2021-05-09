import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { Header } from '../components/Header';

import { useAuth } from '../hooks/useAuth';


interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;


}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  // if (!user && isPrivate) {
  //   return <Redirect to="/signIn" />;
  // }

  // if (user && !isPrivate) {

  //   return <Redirect to="/" />;
  // }
  return (
    <ReactDOMRoute
      {...rest}
      render={() => {

        return <Component />

      }}
    />
  );
};


export default Route;
