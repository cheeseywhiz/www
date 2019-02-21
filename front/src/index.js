import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import root from './reducers/root.js';
import App from './App';
import * as actions from './actions.js';

const store = createStore(
    root,
    composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(actions.init());
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
