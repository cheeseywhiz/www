import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = ({loginForm}) => ({
    error: loginForm.error,
});

export default connect(mapStateToProps)(
    ({error}) => (error && <code>{error}</code>)
);
