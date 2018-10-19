// server
import * as functions from 'firebase-functions'; // eslint-disable-line import/no-extraneous-dependencies
import express from 'express'; // eslint-disable-line import/no-extraneous-dependencies
import compression from 'compression';

// react
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';

// redux
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { StaticRouter } from 'react-router';

// styles
import { ServerStyleSheet } from 'styled-components';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

// App
import App from './src/App';
import Database from './src/database';
import reducers from './src/reducers';
import configuration from './src/config/index';

import { configInit, setContent } from './src/modules/app/app.action';

import Layout from './src/components/layout.component';

function renderFullPage({ html, css, styledCss, meta }) {
  return `
  <!DOCTYPE html>
  <html lang="${meta.lang}">

  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="theme-color" content="${meta.themeColor}">
  <meta name="keywords" content="${meta.keywords}">
  <meta name="description" content="${meta.description}">
  <title>${meta.title}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
  </head>

  <body>
  <script async src="bundle.js"></script>
  <div id="root">${html}</div>
  <style id="jss-server-side">${css}</style>
  ${styledCss}
  </body>

  </html>
  `;
}

function handleRender(req, res, publicData) {
  const { meta, config, content } = publicData;

  // Router
  const staticRouter = new StaticRouter();
  staticRouter.props = { location: req.url, context: {}, basename: '' };
  const { props: { history: staticHistory } } = staticRouter.render();

  const routerMiddleware = createRouterMiddleware(staticHistory);

  /* eslint-disable-next-line no-underscore-dangle */
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    connectRouter(staticHistory)(combineReducers(reducers)),
    composeEnhancers(applyMiddleware(thunk, routerMiddleware)),
  );
  store.dispatch(configInit(config));
  store.dispatch(setContent(content));

  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();
  // Create a sheetsManager instance.
  const sheetsManager = new Map();
  // Create a theme instance.
  const theme = createMuiTheme({
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
  });
  // Create a new class name generator.
  const generateClassName = createGenerateClassName();
  // styled components
  const sheet = new ServerStyleSheet();

  const context = {};
  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
              <Layout>
                <App content={content} />
              </Layout>
            </MuiThemeProvider>
          </JssProvider>
        </StaticRouter>
      </Provider>,
    ),
  );
  // Grab the CSS from our the styledSheet.
  const styledCss = sheet.getStyleTags();

  // Grab the CSS from the sheetsRegistry.
  const css = sheetsRegistry.toString();

  // Send the rendered page back to the client.
  res.set('Cache-Control', 'no-cache');
  res.send(renderFullPage({ html, css, styledCss, meta }));
}
const app = express();
app.use(compression());
app.get('**', (req, res) => {
  // const db = new Database('https://ssr-dev-test.firebaseio.com');
  const { databaseUrl } = configuration;
  const db = new Database(databaseUrl);

  return db
    .get('public')
    .then(publicData => {
      handleRender(req, res, publicData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});
if (process.env.NODE_ENV !== 'production') {
  app.listen(3006, () => {
    console.log('Listening on 3006.');
    console.info('Visit http://localhost:3006/');
  });
}
/* eslint-disable-next-line import/prefer-default-export */
export const ssrapp = functions.https.onRequest(app);
