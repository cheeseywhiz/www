import React, { Component } from 'react';
import LoginForm from './LoginForm.js';
import LogoutButton from './LogoutButton.js';
import ViewIdButton from './ViewIdButton.js';
import ApiError from './ApiError.js';
import LoggedInUsername from './LoggedInUsername.js';
import Payload from './Payload.js';

class App extends Component {
    render() {
        return (
            <div>
                <LoggedInUsername />
                <LoginForm />
                <LogoutButton />
                <ViewIdButton />
                <ApiError />
                <Payload />
            </div>
        );
    }
}

export default App;
