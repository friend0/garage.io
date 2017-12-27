import React, {
    Component
} from 'react';
import Header from '../Header/index';
import Directions from '../Directions';
import Navbar from '../Navbar';

// import AppPassword from '../AppPassword';
// import axios from 'axios';
// import './style.css';

export default class Layout extends Component {

    constructor(props) {	
        super(props);
        this.state = {
        };
    }

    render() {
        return ( 
            <div className = "App" >
            <Header name = "appHeader" / >
            <Navbar name="appNav" / >
            <Directions name = "appDirections" / >
            { this.props.children }
            </div>
        );
    }
}

