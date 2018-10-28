import { GET_TASKS_PENDING, GET_TASKS_REJECTED, GET_TASKS_FULFILLED, UPDATE_TASKS_PENDING, UPDATE_TASKS_REJECTED, UPDATE_TASKS_FULFILLED } from '../actions';

const initialState = {
    loading: false,
    error: null,
    tasks: []
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS_PENDING:
            return { ...state, loading: true, error: null };
        case GET_TASKS_FULFILLED:
            return { ...state, loading: false, error: null, tasks: action.payload.data };
        case GET_TASKS_REJECTED:
            return { ...state, loading: false, error: true };
        case UPDATE_TASKS_PENDING:
            return { ...state, loading: true, error: null };
        case UPDATE_TASKS_FULFILLED:
            return { ...state, loading: false, error: null, tasks: action.payload.data };
        case UPDATE_TASKS_REJECTED:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
}