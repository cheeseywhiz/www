import React from 'react';
import {connect} from 'react-redux';
import selectors from './selectors.js';
import Id from './Id.js';
import SysInfo from './SysInfo.js';
import {endpoints} from './actions.js';

const mapStateToProps = (state) => ({
    payload: selectors.payload(state),
    type: selectors.payload.type(state),
});

export default connect(mapStateToProps)(
    ({payload, type}) => {
        return {
            [endpoints.ID]: <Id />,
            [endpoints.SYSINFO]: <SysInfo />,
        }[type] || <pre>{JSON.stringify(payload)}</pre>;
    }
);
