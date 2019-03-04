import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    endpoint: selectors.endpointSelection(state),
});

const mapDispatchToProps = (dispatch) => ({
    refreshEndpoint: (endpoint) => () => dispatch(actions.refreshEndpoint(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({endpoint, refreshEndpoint}) => <input type="button" value="Refresh" onClick={refreshEndpoint(endpoint)} />
);
