import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Home from './components/Home';
import './App.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
