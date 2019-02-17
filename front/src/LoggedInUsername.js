import React from 'react';
import {connect} from 'react-redux';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    loggedInUsername: selectors.loggedInUsername(state),
});

export default connect(mapStateToProps)(
    ({loggedInUsername}) => {
        if (!loggedInUsername) {
            return <code>Not logged in</code>;
        }

        return <code>Logged in as {loggedInUsername}</code>
    }
);
