import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const initialState = {
 loadState: 0, auth: false, profile: null, search: null, form: null,
};
const middleware = [reduxThunk];
const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middleware),
));

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export default store;
