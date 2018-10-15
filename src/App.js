import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from './modules/home/home.connector';
import PageA from './pages/a/a.connector';
import PageB from './pages/b/b.connector';

const App = () => (
  <Switch>
    <Route exact path="/a" component={PageA} />
    <Route exact path="/b" component={PageB} />
    <Route exact path="/" component={Home} />
  </Switch>
);

export default App;
