import React from 'react';
import {connect} from 'react-redux';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    payload: selectors.payload(state),
});

export default connect(mapStateToProps)(
    ({payload}) => <pre>{payload}</pre>
);
