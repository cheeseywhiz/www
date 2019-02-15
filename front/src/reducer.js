import * as redux from 'redux';
import * as reducers from './reducers.js';

export default redux.combineReducers({...reducers});
