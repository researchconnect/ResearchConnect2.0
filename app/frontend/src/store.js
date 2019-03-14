import { createStore , applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

const initialState = {loadState: 0, auth: false, search: null, form: null};
const middleware = [reduxThunk];
const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middleware)
    ));

export default store;