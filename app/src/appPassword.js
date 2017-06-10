import React, {Component} from 'react';
import PasswordInput from 'react-input-password';
import {Button} from 'react-toolbox/lib/button/Button';


class AppPassword extends React.Component {

    render() {
        return <div className="App-password">
                    <h1>Enter Password to Open Garage</h1>
                    <PasswordInput onChange={this.props.handler}/>
            <Button label={this.props.label} onClick={this.props.onChange}  raised primary/>

        </div>
    }
}

export default AppPassword;
