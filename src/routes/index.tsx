import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';
import Products from '../pages/Products';
import FavoritesPage from '../pages/Favorites';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signIn" exact component={SignIn} />
    <Route path="/signUp" exact component={SignUp} />
    <Route isPrivate path="/favorites" exact component={FavoritesPage} />
    <Route path="/products/:department" exact component={Products} />
  </Switch>
);

export default Routes;
