import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    onLogId: () => dispatch(actions.logId()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({onLogId}) => <input type="button" value="Log Id" onClick={onLogId} />
);
