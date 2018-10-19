import React, { Component } from 'react';
import { hydrate } from 'react-dom';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';

import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import App from './App';
import Database from './database';
import reducers from './reducers';
import configuration from './config/index';

import { configInit, setContent } from './modules/app/app.action';

import Layout from './components/layout.component';

class Main extends Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />;
  }
}
const { databaseUrl } = configuration;
const db = new Database(databaseUrl);

db.get('public').then(publicData => {
  const { content, config } = publicData;

  const history = createHistory();
  const routerMiddleware = createRouterMiddleware(history);

  /* eslint-disable-next-line no-underscore-dangle */
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    connectRouter(history)(combineReducers(reducers)),
    composeEnhancers(applyMiddleware(thunk, routerMiddleware)),
  );
  store.dispatch(configInit(config));
  store.dispatch(setContent(content));

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

  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <Layout>
              <Main content={content} />
            </Layout>
          </MuiThemeProvider>
        </JssProvider>
      </ConnectedRouter>
    </Provider>,
    document.querySelector('#root'),
  );
});
