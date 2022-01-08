import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/configureStore';
import Home from '../components/Home';

describe('Home component is displayed properly', () => {
  test('renders Home', () => {
    const tree = render(
      <Provider store={store}>
        <React.StrictMode>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </React.StrictMode>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
