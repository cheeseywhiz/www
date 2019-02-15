export const types = {
    LOGIN_FORM_UPDATE_USERNAME: 'LOGIN_FORM_UPDATE_USERNAME',
    LOGIN_FORM_UPDATE_PASSWORD: 'LOGIN_FORM_UPDATE_PASSWORD',
    LOGIN_FORM_CLEAR: 'LOGIN_FORM_CLEAR',
};

export const defaultLoginForm = {
    username: '',
    password: '',
};

export function loginFormUpdateUsername(username) {
    const type = types.LOGIN_FORM_UPDATE_USERNAME;
    return {type, username};
};

export function loginFormUpdatePassword(password) {
    const type = types.LOGIN_FORM_UPDATE_PASSWORD;
    return {type, password};
};

export function loginFormClear() {
    const type = types.LOGIN_FORM_CLEAR;
    return {type};
};
