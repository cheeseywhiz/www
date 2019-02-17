import {createSelector} from 'reselect';

const loginFormSelector = ({loginForm}) => loginForm;
const apiErrorSelector = ({apiError}) => apiError;
const loggedInUsernameSelector = ({loggedInUsername}) => loggedInUsername;

const usernameSelector = createSelector(
    loginFormSelector,
    ({username}) => username
);

const passwordSelector = createSelector(
    loginFormSelector,
    ({password}) => password
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

const isLoggedInSelector = createSelector(
    loggedInUsernameSelector,
    (loggedInUsername) => Boolean(loggedInUsername)
);

export default {
    loginForm: {
        username: usernameSelector,
        password: passwordSelector,
        httpForm: httpFormSelector,
    },
    apiError: apiErrorSelector,
    loggedInUsername: loggedInUsernameSelector,
    isLoggedIn: isLoggedInSelector,
};
