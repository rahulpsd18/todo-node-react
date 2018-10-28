import { combineReducers } from 'redux';

import { signupReducer } from './signup';
import { loginReducer } from './login';

export const rootReducer = combineReducers({
    signupReducer,
    loginReducer,
});
