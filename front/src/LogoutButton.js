import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    isLoggedIn: selectors.isLoggedIn(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({onLogout, isLoggedIn}) => {
        if (!isLoggedIn) {
            return null;
        }

        return <input type="button" value="Log out" onClick={onLogout} />
    }
);
