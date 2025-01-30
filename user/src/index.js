import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import BrowserRoutes from './BrowserRoutes';

// Create root instance
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app using createRoot
root.render(
  <Provider store={store}>
    <BrowserRoutes />
  </Provider>
);
