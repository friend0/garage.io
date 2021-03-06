import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'

import registerServiceWorker from './registerServiceWorker';

import Routes from './routes';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Routes history={createHistory} />,
    document.getElementById('root')
);
registerServiceWorker();

