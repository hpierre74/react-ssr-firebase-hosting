//server
import * as functions from "firebase-functions";
import express from "express";
import compression from "compression";

//react
import * as React from "react";
import ReactDOMServer from "react-dom/server";

//redux
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  connectRouter,
  routerMiddleware as createRouterMiddleware
} from "connected-react-router";

import { StaticRouter } from "react-router";

//styles
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

//App
import App from "./src/App";
import Database from "./src/database";
import reducers from "./src/reducers";

function renderFullPage(html, css) {
  return `
  <!DOCTYPE html>
  <html>
  
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <meta name="keywords" content="React, Firebase, SSR, Starter">
  <meta name="description" content="React Firebase SSR Starter">
  <title>React Firebase SSR Starter</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
  
  <!-- <link rel="stylesheet" href="styles.css"> -->
  
  </head>
  
  <body>
  <script async src="bundle.js"></script>
  <div id="root">${html}</div>
  <style id="jss-server-side">${css}</style>
  </body>
  
  </html>
  `;
}

function handleRender(req, res, facts) {
  //redux instance
  const staticRouter = new StaticRouter();

  staticRouter.props = { location: req.url, context: {}, basename: "" };
  const { props: { history: staticHistory } } = staticRouter.render();

  const routerMiddleware = createRouterMiddleware(staticHistory);

  /* eslint-disable-next-line no-underscore-dangle */
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    connectRouter(staticHistory)(combineReducers(reducers)),
    composeEnhancers(applyMiddleware(thunk, routerMiddleware))
  );
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

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

  const context = {};
  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <App facts={facts} />
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
    </Provider>
  );

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString();

  // Send the rendered page back to the client.
  res.set("Cache-Control", "no-cache");
  res.send(renderFullPage(html, css));
}
const app = express();
app.use(compression());
app.get("**", (req, res) => {
  const db = new Database("https://ssr-dev-test.firebaseio.com");

  return db
    .get("facts")
    .then(facts => handleRender(req, res, facts))
    .catch(err => {
      throw new Error(err);
    });
});

export let ssrapp = functions.https.onRequest(app);
//app.listen(3006, () => { console.log('Listening on 3006.'); });
