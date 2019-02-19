import React from 'react';
import {connect} from 'react-redux';
import selectors from './selectors.js';
import * as actions from './actions.js';
import Selector from './Selector.js';

const mapStateToProps = (state) => ({
   endpointSelection: selectors.endpointSelection(state), 
});

const mapDispatchToProps = (dispatch) => ({
    onEndpointChange: (value) => dispatch(actions.updateEndpoint(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({endpointSelection, onEndpointChange}) => {
        const labels = [
            'Endpoint',
            'id',
            'time',
            'sysinfo',
        ];
        return <Selector
            currentValue={endpointSelection}
            values={Object.values(actions.endpoints)}
            labels={labels}
            onChange={onEndpointChange}
            disableFirst />;
    }
);
