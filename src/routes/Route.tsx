import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const user = localStorage.getItem('@growthHackers:user');
  if (!user && isPrivate) {
    return <Redirect to="/signIn" />;
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={() => (
        <>
          <Component />
        </>
      )}
    />
  );
};

export default Route;
