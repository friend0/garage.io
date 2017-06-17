import React, {Component} from 'react';
import Header from '../Header/index';
import Directions from '../Directions';
import AppPassword from '../AppPassword';
import './style.css';
// const GPIO = require('onoff').Gpio;

const password = 'HoldTheDoor';
// const controlPin = new GPIO(2, 'out');

class App extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            doorOpen: false,
            password:'',
            name: '',
            phone: '',
            email: '',
            hint: '',
            label:'Open Garage',
            progress:0};
    }

    componentWillMount() {
        // With limit switches, init state if you can

        // Init RPi GPIO
        // piGPIO.open(this.controlPin, 'output', (err) => {
        //     if (err){
        //         console.log(`There was an error opening pin ${this.controlPin}`, err);
        //     }
        // })

    }

     passwordHandler = (val, ...rest) => {
        console.log(val.target.value);
        this.handleChange('password', val.target.value);
    };

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    buttonHandler = async (e) => {
        if (this.state.password === password){
            await this.setState({ doorOpen: !this.state.doorOpen, label: (!this.state.doorOpen) ? 'Close Garage' : 'Open Garage'});
            // controlPin.writeSync(1);
            // setTimeout(()=>{
            //     controlPin.writeSync(0);
            // }, 500);
            console.log('Door State:', this.state.doorOpen);
        }
    };

    render() {
        return (
            <div className="App">
                <Header name="appHeader" />
                <Directions name="appDirections" />
                <AppPassword label={this.state.label} passwordHandler={this.passwordHandler} onChange={this.buttonHandler}/>
            </div>
        );
    }
}

// process.on('SIGINT', function () {
//     led.unexport();
//     button.unexport();
// });

export default App;
