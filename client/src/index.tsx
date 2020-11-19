import React from 'react';
import ReactDOM from 'react-dom';
import { initializeFirebase } from './auth';
import { App } from './components/App';

initializeFirebase();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
