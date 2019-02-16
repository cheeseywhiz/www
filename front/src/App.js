import React, { Component } from 'react';
import LoginForm from './LoginForm.js';
import LogoutButton from './LogoutButton.js';
import LogIdButton from './LogIdButton.js';
import LoginError from './LoginError.js';

class App extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                <LogoutButton />
                <LogIdButton />
                <LoginError />
            </div>
        );
    }
}

export default App;
