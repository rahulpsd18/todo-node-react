import {
    GET_TASKS_PENDING,
    GET_TASKS_REJECTED,
    GET_TASKS_FULFILLED,
    ADD_TASK_PENDING,
    ADD_TASK_FULFILLED,
    ADD_TASK_REJECTED,
    UPDATE_TASK_PENDING,
    UPDATE_TASK_REJECTED,
    UPDATE_TASK_FULFILLED,
    UPDATE_TASKS_PENDING,
    UPDATE_TASKS_REJECTED,
    UPDATE_TASKS_FULFILLED,
    DELETE_TASKS_PENDING,
    DELETE_TASKS_REJECTED,
    DELETE_TASKS_FULFILLED,
} from '../actions';

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
            return { ...state, loading: false, error: action.payload.response.data.message };

        case ADD_TASK_PENDING:
            return { ...state, loading: true, error: null };
        case ADD_TASK_FULFILLED:
            return { ...state, loading: false, error: null, tasks: [action.payload.data, ...state.tasks] };
        case ADD_TASK_REJECTED:
            return { ...state, loading: false, error: action.payload.response.data.message };

        case UPDATE_TASK_PENDING:
            return { ...state, loading: true, error: null };
        case UPDATE_TASK_FULFILLED:
            return { ...state, loading: false, error: null };
        case UPDATE_TASK_REJECTED:
            return { ...state, loading: false, error: action.payload.response.data.message };

        case UPDATE_TASKS_PENDING:
            return { ...state, loading: true, error: null };
        case UPDATE_TASKS_FULFILLED:
            return { ...state, loading: false, error: null, tasks: action.payload.data };
        case UPDATE_TASKS_REJECTED:
            return { ...state, loading: false, error: action.payload.response.data.message };

        case DELETE_TASKS_PENDING:
            return { ...state, loading: true, error: null };
        case DELETE_TASKS_FULFILLED:
            return { ...state, loading: false, error: null };
        case DELETE_TASKS_REJECTED:
            return { ...state, loading: false, error: action.payload.response.data.message };

        default:
            return state;
    }
}