import React from 'react';
import ReactDOM from 'react-dom';
import * as redux from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer.js';
import App from './App';

const store = redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
