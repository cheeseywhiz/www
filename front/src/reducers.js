import {
    types, defaultLoginForm,
} from './actions.js';

export function loginForm(state = defaultLoginForm, {type, ...action}) {
    switch (type) {
        case types.LOGIN_FORM_UPDATE_USERNAME:
            const {username} = action;
            return {...state, username};
        case types.LOGIN_FORM_UPDATE_PASSWORD:
            const {password} = action;
            return {...state, password};
        case types.LOGIN_FORM_CLEAR:
            return defaultLoginForm;
        default:
            return state;
    }
}

export function apiError(state = '', {type, error}) {
    switch (type) {
        case types.SET_API_ERROR:
            return error;
        default:
            return state;
    }
}

export function loggedInUsername(state = null, {type, username}) {
    switch (type) {
        case types.SET_LOGGED_IN_USERNAME:
            return username;
        default:
            return state;
    }
}
