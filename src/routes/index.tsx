import React from 'react';
import { Switch } from 'react-router-dom'

import Route from './Route';

import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SingUp';
import Products from '../pages/Products';
import Favorites from '../pages/Favorites';


const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signIn" exact component={SignIn} />
    <Route path="/signUp" exact component={SignUp} />
    <Route path="/favorites" exact component={Favorites} />
    <Route path="/products/:category" exact component={Products} />
  </Switch>
);

export default Routes;
