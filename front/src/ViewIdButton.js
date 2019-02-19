import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    onViewId: () => dispatch(actions.viewId()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({onViewId}) => <input type="button" value="View Id" onClick={onViewId} />
);
