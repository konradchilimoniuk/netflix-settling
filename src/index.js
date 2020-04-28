import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './global.scss';
import App from './App';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Data/Store'
import Loader from './Objects/Loader';
 
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);