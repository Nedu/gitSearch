import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import 'fontsource-roboto';

import App from './components/App';
import './assets/styles/app.scss';

const queryCache = new QueryCache()

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactQueryCacheProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
