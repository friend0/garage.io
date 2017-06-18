import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
// import NotFound from './components/NotFound';

import { BrowserRouter } from 'react-router-dom'

const Routes = (props) => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

export default Routes;