import React from 'react';
import {connect} from 'react-redux';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    loggedInUsername: selectors.loggedInUsername(state),
    isLoggedIn: selectors.isLoggedIn(state),
});

export default connect(mapStateToProps)(
    ({loggedInUsername, isLoggedIn}) => {
        if (!isLoggedIn) {
            return null;
        }

        return <code>Logged in as {loggedInUsername}</code>
    }
);
