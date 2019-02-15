import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';

const mapStateToProps = ({loginForm}) => ({
    username: loginForm.username,
});

const mapDispatchToProps = (dispatch) => ({
    onUpdateUsername: (event) => dispatch(actions.loginFormUpdateUsername(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({username, onUpdateUsername}) => {
        return <input
            type="text"
            placeholder="username"
            value={username}
            onChange={onUpdateUsername}
        />
    }
);
