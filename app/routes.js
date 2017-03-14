import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Dishes from './components/Dishes';
import Dish from './components/Dish';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
      <Route path='/dishes' component={Dishes} />
      <Route path='/dish/:name' component={Dish} />
  </Route>
);
