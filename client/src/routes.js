import React from "react";
// import { Router, Route } from 'react-router';

import App from "./components/App";
import Signup from "./components/Signup";
import IngressAuth from "./components/IngressAuth";
import NotFound from "./components/NotFound";
// import NotFound from './components/NotFound';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Routes = props => (
	<Router>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/signup" component={Signup} />
			<Route component={NotFound} />
		</Switch>
	</Router>
);

export default Routes;
