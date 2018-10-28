import { combineReducers } from 'redux';

import { signupReducer } from './signup';
import { loginReducer } from './login';
import { tasksReducer } from './tasks';

export const rootReducer = combineReducers({
    signupReducer,
    loginReducer,
    tasksReducer,
});
