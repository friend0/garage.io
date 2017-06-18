import React, {Component} from 'react';
import Header from '../Header/index';
import Directions from '../Directions';
import AppPassword from '../AppPassword';
import axios from 'axios';
import './style.css';

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
            progress: 0,
        };
    }

    // componentDidMount() {
    //     fetch('/api/control')
    //         .then(res => res.json())
    //         .then(users => this.setState({ users }));
    // }

    componentWillMount() {
        // With limit switches, init state if you can
        console.log('App mounting...');

    }

     passwordHandler = (val, ...rest) => {
        console.log(val.target.value);
        this.handleChange('password', val.target.value);
    };

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    buttonHandler = async (e) => {
        // if (this.state.password === password){
        console.log('Button Pressed...');
        let response;
        try {
            response = await axios({
                method:'get',
                url:'/api/control',
                params: {
                    password: this.state.password,
                }
            });
            console.log(response);
        }
        catch (e) {
            console.log(e);
        }

        if (response && response.status === 200){
            await this.setState({ doorOpen: !this.state.doorOpen, label: (!this.state.doorOpen) ? 'Close Garage' : 'Open Garage'});
            console.log('Doors open mayne:', this.state.doorOpen);
        }
        else {
            throw Error('Incorrect Password or Bad Response.');
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
