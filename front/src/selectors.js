import {createSelector} from 'reselect';

const loginFormSelector = (state) => state.loginForm;

const usernameSelector = createSelector(
    loginFormSelector,
    ({username}) => username
);

const passwordSelector = createSelector(
    loginFormSelector,
    ({password}) => password
);

const errorSelector = createSelector(
    loginFormSelector,
    ({error}) => error
);

const httpFormSelector = createSelector(
    usernameSelector, passwordSelector,
    (username, password) => {
        const form = new FormData();
        form.append('username', username);
        form.append('password', password);
        return form;
    }
);

export default {
    loginForm: {
        username: usernameSelector,
        password: passwordSelector,
        error: errorSelector,
        httpForm: httpFormSelector,
    }
};
