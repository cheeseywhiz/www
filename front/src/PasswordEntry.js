import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    password: selectors.loginForm.password(state),
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
