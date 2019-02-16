export const types = {
    LOGIN_FORM_UPDATE_USERNAME: 'LOGIN_FORM_UPDATE_USERNAME',
    LOGIN_FORM_UPDATE_PASSWORD: 'LOGIN_FORM_UPDATE_PASSWORD',
    LOGIN_FORM_CLEAR: 'LOGIN_FORM_CLEAR',
    LOGIN_FORM_SET_ERROR: 'LOGIN_FORM_SET_ERROR',
};

export const defaultLoginForm = {
    username: '',
    password: '',
    error: '',
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

export function loginFormSetError(error) {
    const type = types.LOGIN_FORM_SET_ERROR;
    return {type, error};
}

class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ApiError';
    }
}

const checkApiError = (dispatch) => (response) => {
    if (!response.ok) {
        return response.json().then((json) => {
            const {message} = json;
            throw new ApiError(message);
        });
    }

    dispatch(loginFormSetError(''));
    return response;
};

const catchApiError = (dispatch) => (error) => {
    switch (error.name) {
        case 'ApiError':
            dispatch(loginFormSetError(error.message));
            break;
        default:
            break;
    }
};

export function login(username, password) {
    return (dispatch) => {
        const form = new FormData();
        form.append('username', username);
        form.append('password', password);
        fetch('/api/auth/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: form,
        })
            .then(checkApiError(dispatch))
            .then((response) => {
                console.table(response);
                dispatch(loginFormClear());
            })
            .catch(catchApiError(dispatch));
    };
};

export function logout() {
    return (dispatch) => {
        fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'same-origin',
        })
            .then(checkApiError(dispatch))
            .catch(catchApiError(dispatch));
    };
};

export function logId() {
    return (dispatch) => {
        fetch('/api/id', {
            credentials: 'same-origin',
        })
            .then(checkApiError(dispatch))
            .then((response) => response.json())
            .then((json) => json && console.log(JSON.stringify(json)))
            .catch(catchApiError(dispatch));
    };
}
