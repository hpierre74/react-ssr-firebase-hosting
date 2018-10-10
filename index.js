import express from "express";
import * as functions from "firebase-functions";
import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import App from "./src/App";
import Database from "./src/database";

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

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <App facts={facts} />
      </MuiThemeProvider>
    </JssProvider>
  );

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString();

  // Send the rendered page back to the client.
  res.set("Cache-Control", "no-cache");
  res.send(renderFullPage(html, css));
}
const app = express();
app.get("**", (req, res) => {
  const db = new Database("https://ssr-dev-test.firebaseio.com");

  db.get("facts")
    .then(facts => {
      handleRender(req, res, facts);
      // const html = renderToString(<App facts={facts} />);
      // const finalHtml = index.replace("<!-- ::APP:: -->", html);
      // res.set("Cache-Control", "no-cache");
      // res.set("Content-Type", "text/html; utf8");
      // res.send(finalHtml);
    })
    .catch(err => {
      throw new Error(err);
    });
});

export let ssrapp = functions.https.onRequest(app);
//app.listen(3006, () => { console.log('Listening on 3006.'); });
