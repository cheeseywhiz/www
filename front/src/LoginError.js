import React from 'react';
import {connect} from 'react-redux';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    error: selectors.loginForm.error(state),
});

export default connect(mapStateToProps)(
    ({error}) => (error && <code>{error}</code>)
);
