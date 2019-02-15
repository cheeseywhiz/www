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
