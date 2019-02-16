import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';
import UsernameEntry from './UsernameEntry.js';
import PasswordEntry from './PasswordEntry.js';

const mapStateToProps = ({loginForm}) => ({
    username: loginForm.username,
    password: loginForm.password,
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (username, password) => (event) => {
        event.preventDefault();
        dispatch(actions.login(username, password));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({username, password, onSubmit}) => {
        return <form onSubmit={onSubmit(username, password)}>
            <UsernameEntry />
            <PasswordEntry />
            <input type="submit" value="Submit" />
        </form>
    }
);
