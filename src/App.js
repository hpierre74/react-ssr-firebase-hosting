import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "./components/header";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    textAlign: "center"
  }
});

const App = props => {
  return (
    <div className={props.classes.root}>
      <Button variant="outlined" color="primary">
        Button
      </Button>
      <Header facts={props.facts} />
    </div>
  );
};

export default withStyles(styles)(App);
