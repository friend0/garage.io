import React, { Component } from 'react';
import debounce from 'debounce';
import PasswordInput from 'react-input-password';
import { Button } from 'react-toolbox/lib/button/Button';
import Form from 'react-input';

class AppPassword extends React.Component {

	onChangeDebounce = debounce(this.props.onChange, 5000, true);

	render() {
		return <div className = "App-password" >
			<h1> Enter Password to Open Garage </h1> 
			<Form fields = {
				[{
					key: 'email',
					type: 'email',
					error: false,
					required: false,
					placeholder: 'Enter an email',
					onChange: this.props.emailHandler,
				}]
			} onChange = {this.props.emailHandler}/>
			<PasswordInput label='password' onChange = {this.props.passwordHandler}/>
			<Button label = {this.props.label} onClick = {this.onChangeDebounce} raised primary / >
		</div>
	}
}

export default AppPassword;