import React from 'react';
// import { Router, Route } from 'react-router';

import App from './components/App';
import Signup from './components/Signup';
import IngressAuth from './components/IngressAuth';
// import NotFound from './components/NotFound';

import { BrowserRouter as Router, Route } from 'react-router-dom'

const Routes = (props) => (
    <Router>
    	<div>
        	<Route exact  path="/" component={App} />
	    	<Route path="/auth" component={IngressAuth} />
	    	<Route path="/signup" component={Signup} />
	    </div>
    </Router>
);

export default Routes;