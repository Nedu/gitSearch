import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/app.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
