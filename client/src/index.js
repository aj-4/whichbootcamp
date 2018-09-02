import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.hydrate(<App />, document.getElementById('root'));
// registerServiceWorker();
unregister();
