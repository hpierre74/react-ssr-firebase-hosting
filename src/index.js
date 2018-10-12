import React, { Component } from "react";
import { hydrate } from "react-dom";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware as createRouterMiddleware
} from "connected-react-router";
import createHistory from "history/createBrowserHistory";

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
import reducers from "./reducers";

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
  const history = createHistory();
  const routerMiddleware = createRouterMiddleware(history);

  /* eslint-disable-next-line no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    connectRouter(history)(combineReducers(reducers)),
    composeEnhancers(applyMiddleware(thunk, routerMiddleware))
  );
  store.dispatch({ type: "first try" });

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
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <Main facts={facts} />
          </MuiThemeProvider>
        </JssProvider>
      </ConnectedRouter>
    </Provider>,
    document.querySelector("#root")
  );
});
