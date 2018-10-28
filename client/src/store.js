import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import promise from 'redux-promise-middleware';

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(promise())),
);
