import React, {Component} from 'react';
import logo from '../App/logo.svg';


class Header extends React.Component {
    render() {
        return <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Garage.io</h2>
        </div>;
    }
}

export default Header;
