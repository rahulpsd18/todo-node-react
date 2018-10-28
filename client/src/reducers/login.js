import { LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED } from '../actions';

const initialState = {
    loading: false,
    token: '',
    error: null
};

export const loginReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case LOGIN_PENDING:
            return { ...state, loading: true, error: null };
        case LOGIN_FULFILLED:
            return { ...state, loading: false, error: null, token: action.payload.data.token };
        case LOGIN_REJECTED:
            return { ...state, loading: false, error: action.payload.response.data.message };
        default:
            return state;
    }
}