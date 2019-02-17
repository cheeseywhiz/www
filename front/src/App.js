import React, { Component } from 'react';
import LoginForm from './LoginForm.js';
import LogoutButton from './LogoutButton.js';
import LogIdButton from './LogIdButton.js';
import ApiError from './ApiError.js';
import LoggedInUsername from './LoggedInUsername.js';

class App extends Component {
    render() {
        return (
            <div>
                <LoggedInUsername />
                <LoginForm />
                <LogoutButton />
                <LogIdButton />
                <ApiError />
            </div>
        );
    }
}

export default App;
