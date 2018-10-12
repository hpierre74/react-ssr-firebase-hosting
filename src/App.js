import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { Switch, Route } from "react-router-dom";
import Home from "./modules/home/home.connector";
import { PageA } from "./pages/a.page";
import { PageB } from "./pages/b.page";

const styles = theme => ({
  root: {
    textAlign: "center"
  }
});

const App = props => {
  return (
    <Switch>
      <Route exact path="/a" component={PageA} />
      <Route exact path="/b" component={PageB} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default withStyles(styles)(App);
