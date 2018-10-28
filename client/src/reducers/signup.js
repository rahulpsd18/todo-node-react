import { SIGNUP_PENDING, SIGNUP_REJECTED, SIGNUP_FULFILLED } from '../actions';

const initialState = {
    loading: false,
    error: null,
    success: ''
};

export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_PENDING:
            return { ...state, loading: true, error: null };
        case SIGNUP_FULFILLED:
            return { ...state, loading: false, error: null, success: action.payload.data.message };
        case SIGNUP_REJECTED:
            return { ...state, loading: false, error: action.payload.response.data.message };
        default:
            return state;
    }
}