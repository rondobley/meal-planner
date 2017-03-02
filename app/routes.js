import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
      <Route path='/recipe/:title' component={Recipe} />
      <Route path='/recipes' component={Recipes} />
  </Route>
);
