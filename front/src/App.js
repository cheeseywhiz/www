import React, { Component } from 'react';
import LoginForm from './LoginForm.js';
import LogoutButton from './LogoutButton.js';
import LogIdButton from './LogIdButton.js';

class App extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                <LogoutButton />
                <LogIdButton />
            </div>
        );
    }
}

export default App;
