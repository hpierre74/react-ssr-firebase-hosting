import React, { Component } from "react";
import { hydrate } from "react-dom";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import App from "./App";
import Database from "./database";

class Main extends Component {
  constructor(props) {
    super(props);
  }
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App facts={this.props.facts} />;
  }
}
const db = new Database("https://ssr-dev-test.firebaseio.com");

db.get("facts").then(facts => {
  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: "light"
    }
  });

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  hydrate(
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <Main facts={facts} />
      </MuiThemeProvider>
    </JssProvider>,
    document.querySelector("#root")
  );
});
