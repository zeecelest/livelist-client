import 'unfetch/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { PlayListProvider } from './contexts/PlayListContext';
import { UserProvider } from './contexts/UserContext';

ReactDOM.render(
  <BrowserRouter>
    <PlayListProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PlayListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
