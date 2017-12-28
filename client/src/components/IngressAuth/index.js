import React, { Component } from 'react';
import debounce from 'debounce';
import PasswordInput from 'react-input-password';
// import { Button } from 'react-toolbox/lib/button/Button';
import Form from 'react-input';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import config from "../config";
import "./ingress.css";
import Layout from "../Layout";
import axios from "axios";

class AppPassword extends React.Component {


	constructor(props) {
		console.log('CONST PROPS', props)
		super(props);
	}

	validateForm() {
		return true;
		// return this.props.email.length > 0 && this.props.password.length > 0;
	}

	handleChange = event => {
		console.log('event', event)
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	onChangeDebounce = debounce(this.props.onSubmit, 5000, true);

	handleSubmit = async event => {
		event.preventDefault();
		try {
			await this.onChangeDebounce(event);
			// this.props.userHasAuthenticated(true);
		} catch (e) {
			alert(e);
		}
	};

	render() {
		return (
			<div>
				<div className="IngressAuth">
					<form onSubmit={this.handleSubmit}>
						<FormGroup controlId="email" bsSize="large">
							<ControlLabel> Email </ControlLabel>{" "}
							<FormControl
								autoFocus
								type="email"
								value={this.props.email}
								onChange={this.props.emailHandler}
							/>{" "}
						</FormGroup>{" "}
						<FormGroup controlId="password" bsSize="large">
							<ControlLabel> Password </ControlLabel>{" "}
							<FormControl
								value={this.props.password}
								onChange={this.props.passwordHandler}
								type="password"
							/>
						</FormGroup>{" "}
						<Button block bsSize="large" disabled={!this.validateForm()} type="submit"> {this.props.label} {" "} </Button>{" "}
					</form>{" "}
				</div>{" "}
				</div>
		);
	}
}

export default AppPassword;