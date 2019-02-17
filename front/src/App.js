import React, { Component } from 'react';
import LoginForm from './LoginForm.js';
import LogoutButton from './LogoutButton.js';
import LogIdButton from './LogIdButton.js';
import ApiError from './ApiError.js';

class App extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                <LogoutButton />
                <LogIdButton />
                <ApiError />
            </div>
        );
    }
}

export default App;
