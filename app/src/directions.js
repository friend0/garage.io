import React, {Component} from 'react';


class Directions extends React.Component {
    render() {
        return <p className="App-intro">
            This application can be used to open the garage door from any device connected to our network.
            Please keep in mind that you are controlling a real physical system, and harm may come to the mechanisms in the door if mistreated.
            To get started, please enter a valid password below, then submit using the button.
        </p>
    }
}

export default Directions;