import React, {Component} from 'react';


class Directions extends React.Component {
    render() {
        return <p className="App-intro">
            This application can be used to open the garage door from any device connected to our network.
            Please keep in mind that you are controlling a real system, so care should be taken not to mistreat the door.
            To get started, please enter valid credentials below; when valida credentials are present, door functionality will be active.
        </p>
    }
}

export default Directions;