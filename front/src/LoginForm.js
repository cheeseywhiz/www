import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';
import UsernameEntry from './UsernameEntry.js';
import PasswordEntry from './PasswordEntry.js';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    httpForm: selectors.loginForm.httpForm(state),
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (httpForm) => (event) => {
        event.preventDefault();
        dispatch(actions.login(httpForm));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({httpForm, onSubmit}) => {
        return <form onSubmit={onSubmit(httpForm)}>
            <UsernameEntry />
            <PasswordEntry />
            <input type="submit" value="Submit" />
        </form>
    }
);
