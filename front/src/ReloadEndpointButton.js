import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    endpoint: selectors.endpointSelection(state),
});

const mapDispatchToProps = (dispatch) => ({
    reloadEndpoint: (endpoint) => () => dispatch(actions.reloadEndpoint(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({endpoint, reloadEndpoint}) => <input type="button" value="Reload" onClick={reloadEndpoint(endpoint)} />
);
