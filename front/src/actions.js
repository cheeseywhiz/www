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
            .then((response) => {
                if (!response.ok) {
                    response.json().then((json) => {
                        const {message} = json;
                        dispatch(loginFormSetError(message));
                    });
                    return;
                }

                console.table(response);
                dispatch(loginFormClear());
            });
    };
};

export function logout() {
    return (dispatch) => {
        fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'same-origin',
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((json) => {
                        const {message} = json;
                        dispatch(loginFormSetError(message));
                    });
                    return;
                }
            });
    };
};

export function logId() {
    return (dispatch) => {
        fetch('/api/id', {
            credentials: 'same-origin',
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((json) => {
                        const {message} = json;
                        dispatch(loginFormSetError(message));
                    });
                    return;
                }

                return response.json();
            })
            .then((json) => json && console.log(JSON.stringify(json)));
    };
}
