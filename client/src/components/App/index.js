import React, { Component } from "react";
import Header from "../Header/index";
import Directions from "../Directions";
import IngressAuth from "../IngressAuth";
import axios from "axios";
import "./style.css";
import Layout from "../Layout";

class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            doorOpen: false,
            password: "",
            name: "",
            phone: "",
            email: "",
            hint: "",
            label: "Open Garage",
            progress: 0
        };
    }

    componentWillMount() {
        // With limit switches, init state if you can
        console.log("App mounting...");
    };

    emailHandler = (val, ...rest) => {
        this.handleChange("email", val.target.value);
    };

    passwordHandler = (val, ...rest) => {
        this.handleChange("password", val.target.value);
    };

    handleChange = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    buttonHandler = async e => {
        // if (this.state.password === password){
        console.log("Button Pressed...");
        console.log("state at button press...", this.state);
        let response;
        try {
            response = await axios({
                method: "get",
                url: "/api/control",
                params: {
                    password: this.state.password,
                    email: this.state.email
                }
            });
            console.log(response);
        } catch (e) {
            console.log(e);
        }

        if (response && response.data && response.data.status === 200) {
            await this.setState({
                doorOpen: !this.state.doorOpen,
                label: !this.state.doorOpen ? "Close Garage" : "Open Garage"
            });
            console.log("Doors open mayne:", this.state.doorOpen);
        } else {
            console.log("Incorrect Password!");
        }
    };

    render() {
        return (
            <Layout>
                <IngressAuth
                    label={this.state.label}
                    email={this.state.email}
                    password={this.state.password}
                    passwordHandler={this.passwordHandler}
                    emailHandler={this.emailHandler}
                    onSubmit={this.buttonHandler}
                />
            </Layout>
        );
    }
}

export default App;
