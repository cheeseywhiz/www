import {combineReducers} from 'redux';
import {types, endpoints} from '../actions.js';

export default combineReducers({
    payload: (state = '', {type, ...action}) => {
        switch(type) {
            case types.SET_PAYLOAD:
                const {data} = action;
                return data;
            default:
                return state;
        }
    },

    type: (state = endpoints.NONE, {type, ...action}) => {
        switch (type) {
            case types.SET_PAYLOAD:
                const {payload_type} = action;
                return payload_type;
            default:
                return state;
        }
    },
});
