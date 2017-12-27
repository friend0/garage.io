import React, {
	Component
} from "react";
import {
	Button,
	FormGroup,
	FormControl,
	ControlLabel
} from "react-bootstrap";
// import config from "../config";
import "./signup.css";
import Layout from '../Layout';
import axios from 'axios';


export default class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		};
	}

	signup() {
		console.log('STATE ---->', this)
		axios({
				method: 'post',
				url: '/api/users',
				data: {
					email: this.state.email,
					password: this.state.password,
				},
			}).then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});

	}

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = async event => {
		event.preventDefault();

		try {
			await this.signup(this.state.email, this.state.password);
			// this.props.userHasAuthenticated(true);
		} catch (e) {
			alert(e);
		}
	}

	render() {
		return ( <
			Layout >
			<
			div className = "Signup" >
			<
			form onSubmit = {
				this.handleSubmit
			} >
			<
			FormGroup controlId = "email"
			bsSize = "large" >
			<
			ControlLabel > Email < /ControlLabel> <
			FormControl autoFocus type = "email"
			value = {
				this.state.email
			}
			onChange = {
				this.handleChange
			}
			/> < /
			FormGroup > <
			FormGroup controlId = "password"
			bsSize = "large" >
			<
			ControlLabel > Password < /ControlLabel> <
			FormControl value = {
				this.state.password
			}
			onChange = {
				this.handleChange
			}
			type = "password" /
			>
			<
			/FormGroup> <
			Button block bsSize = "large"
			disabled = {!this.validateForm()
			}
			type = "submit" >
			Request Access <
			/Button> < /
			form > <
			/div> < /
			Layout >
		);
	}
}