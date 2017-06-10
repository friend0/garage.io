import React, {Component} from 'react';
import Header from './header';
import Directions from './directions';
import AppPassword from './appPassword';
import {Button} from 'react-toolbox/lib/button/Button';
import ProgressBar from 'react-progressbar.js';
import './App.css';

const Circle = ProgressBar.Circle;


const password = 'HoldTheDoor';
class App extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { doorOpen: false, passwordInput:'', name: '', phone: '', email: '', hint: '', label:'Open Garage', progress:0};
    }

    options = {
        strokeWidth: 2
    };

    containerStyle = {
    width: '200px',
    height: '200px'
};
    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    // todo: de-bounce
    buttonHandler = async (e) => {
        await this.setState({ doorOpen: !this.state.doorOpen, label: (!this.state.doorOpen) ? 'Close Garage' : 'Open Garage'});
        console.log('Door Open:', this.state.doorOpen);

    };

    render() {
        return (
            <div className="App">
                <Header name="appHeader" />
                <Directions name="appDirections" />
                <AppPassword label={this.state.label} onChange={this.buttonHandler}/>


                {/*<div>*/}
                    {/*<ProgressBar type="circular" mode="indeterminate" />*/}
                    {/*<ProgressBar type="linear" mode="determinate" value={83} buffer={90} />*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default App;
