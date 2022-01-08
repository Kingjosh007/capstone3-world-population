import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/configureStore';
import App from '../App';

describe('App page works fine fine', () => {
  test('renders App', () => {
    const tree = render(
      <Provider store={store}>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
