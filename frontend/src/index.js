import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/AppComponent/AppComponent';
import * as serviceWorker from './serviceWorker';
import './index.scss';

ReactDOM.render(
  // <React.StrictMode>
    <AppComponent />,
  // </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
