import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
