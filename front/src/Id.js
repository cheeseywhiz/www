import React from 'react';
import {connect} from 'react-redux';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    payload: selectors.payload(state),
});

export default connect(mapStateToProps)(
    ({payload}) => <ul>
        <li>
            Group
            <ul>
                <li>{payload.group[0]}</li>
                <li>{payload.group[1]}</li>
            </ul>
        </li>
        <li>
            User
            <ul>
                <li>{payload.user[0]}</li>
                <li>{payload.user[1]}</li>
            </ul>
        </li>
        <li>
            Groups
            <ol>
                {payload.groups.map(([id, name]) => <li key={name}>
                    <ul>
                        <li>{id}</li>
                        <li>{name}</li>
                    </ul>
                </li>)}
            </ol>
        </li>
    </ul>
);
