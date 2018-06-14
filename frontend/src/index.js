import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter
} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const initialState = {};
const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middleware = [routerMiddleware(history), sagaMiddleware];

const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);


registerServiceWorker();
