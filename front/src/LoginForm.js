import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';
import UsernameEntry from './UsernameEntry.js';
import PasswordEntry from './PasswordEntry.js';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (event) => {
        event.preventDefault();
        dispatch(actions.loginFormClear());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({onSubmit}) => {
        return <form onSubmit={onSubmit}>
            <UsernameEntry />
            <PasswordEntry />
            <input type="submit" value="Submit" />
        </form>
    }
);
