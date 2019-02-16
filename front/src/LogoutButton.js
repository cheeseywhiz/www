import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions.js';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({onLogout}) => <input type="button" value="Log out" onClick={onLogout} />
);
