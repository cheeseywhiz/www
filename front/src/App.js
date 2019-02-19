import React, { Component } from 'react';
import LoginForm from './LoginForm.js';
import LogoutButton from './LogoutButton.js';
import ApiError from './ApiError.js';
import LoggedInUsername from './LoggedInUsername.js';
import EndpointSelector from './EndpointSelector.js';
import Payload from './Payload.js';

class App extends Component {
    render() {
        return (
            <div>
                <LoggedInUsername />
                <LoginForm />
                <LogoutButton />
                <ApiError />
                <EndpointSelector />
                <Payload />
            </div>
        );
    }
}

export default App;
