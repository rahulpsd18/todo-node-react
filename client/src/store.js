import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { saveState, loadState } from './localStorage';
import promise from 'redux-promise-middleware';
import throttle from 'lodash.throttle';

const persistedStore = loadState();

export const store = createStore(
    rootReducer,
    persistedStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(promise())),
    );

    store.subscribe(throttle(() => {
        saveState(store.getState());
}), 1000);
