import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';

const mapStateToProps = ({loginForm}) => ({
    password: loginForm.password,
});

const mapDispatchToProps = (dispatch) => ({
    onUpdatePassword: (event) => dispatch(actions.loginFormUpdatePassword(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({password, onUpdatePassword}) => {
        return <input
            type="password"
            placeholder="password"
            value={password}
            onChange={onUpdatePassword}
        />
    }
);
