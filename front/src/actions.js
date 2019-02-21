export const types = {
    LOGIN_FORM_UPDATE_USERNAME: 'LOGIN_FORM_UPDATE_USERNAME',
    LOGIN_FORM_UPDATE_PASSWORD: 'LOGIN_FORM_UPDATE_PASSWORD',
    LOGIN_FORM_CLEAR: 'LOGIN_FORM_CLEAR',
    SET_API_ERROR: 'SET_API_ERROR',
    SET_LOGGED_IN_USERNAME: 'SET_LOGGED_IN_USERNAME',
    SET_PAYLOAD: 'SET_PAYLOAD',
    SET_ENDPOINT_SELECTION: 'SET_ENDPOINT_SELECTION',
};

export const endpoints = {
    NONE: 'EP_NONE',
    ID: 'EP_ID',
    TIME: 'EP_TIME',
    SYSINFO: 'EP_SYSINFO',
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

export function setApiError(error) {
    const type = types.SET_API_ERROR;
    return {type, error};
}

export function setLoggedInUsername(username) {
    const type = types.SET_LOGGED_IN_USERNAME;
    return {type, username};
}

export function setPayload(data, payload_type) {
    const type = types.SET_PAYLOAD;
    return {type, data, payload_type};
}

export function setEndpointSelection(endpoint) {
    const type = types.SET_ENDPOINT_SELECTION;
    return {type, endpoint};
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

    dispatch(setApiError(''));
    return response;
};

const catchApiError = (dispatch, then) => (error) => {
    switch (error.name) {
        case 'ApiError':
            dispatch(setApiError(error.message));
            then && then();
            break;
        default:
            break;
    }
};

export function login(httpForm) {
    return (dispatch) => {
        fetch('/api/auth/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: httpForm,
        })
            .then(checkApiError(dispatch))
            .then((response) => {
                dispatch(loginFormClear());
                dispatch(updateLoggedInUser());
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
            .then(() => dispatch(updateLoggedInUser()))
            .catch(catchApiError(dispatch));
    };
};

export function updateEndpoint(value) {
    return (dispatch) => {
        dispatch(setEndpointSelection(value));
        const uri= {
            [endpoints.ID]: '/api/id',
            [endpoints.TIME]: '/api/time',
            [endpoints.SYSINFO]: '/api/sysinfo',
        }[value];
        fetch(uri, {
            credentials: 'same-origin',
        })
            .then(checkApiError(dispatch))
            .then((response) => response.json())
            .then((json) => dispatch(setPayload(json, value)))
            .catch(catchApiError(dispatch, () => {
                dispatch(setPayload('', endpoints.NONE));
            }));
    };
}

export function updateLoggedInUser() {
    return (dispatch) => {
        fetch('/api/auth/username', {
            credentials: 'same-origin',
        })
            .then(checkApiError(dispatch))
            .then((response) => response.json())
            .then((json) => {
                const {username} = json;
                dispatch(setLoggedInUsername(username));
            })
            .catch(catchApiError(dispatch));
    };
}

export function init() {
    return (dispatch) => {
        dispatch(updateLoggedInUser());
    };
}
