import React, { Component } from 'react';
import LoginForm from './LoginForm.js';
import LogoutButton from './LogoutButton.js';

class App extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                <LogoutButton />
            </div>
        );
    }
}

export default App;
