import React, {Component} from 'react';
import debounce from 'debounce';
import PasswordInput from 'react-input-password';
import {Button} from 'react-toolbox/lib/button/Button';


class AppPassword extends React.Component {

    onChangeDebounce = debounce(this.props.onChange, 5000, true);

    render() {
        return <div className="App-password">
            <h1>Enter Password to Open Garage</h1>
            <PasswordInput onChange={this.props.passwordHandler}/>
            <Button label={this.props.label} onClick={this.onChangeDebounce} raised primary/>
        </div>
    }
}

export default AppPassword;
