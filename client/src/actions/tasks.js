import axios from 'axios';
import { loadState } from '../localStorage';

export const GET_TASKS = 'containers/tasks/GET_TASKS';
export const GET_TASKS_PENDING = 'containers/tasks/GET_TASKS_PENDING';
export const GET_TASKS_REJECTED = 'containers/tasks/GET_TASKS_REJECTED';
export const GET_TASKS_FULFILLED = 'containers/tasks/GET_TASKS_FULFILLED';

export const ADD_TASK = 'containers/tasks/ADD_TASK';
export const ADD_TASK_PENDING = 'containers/tasks/ADD_TASK_PENDING';
export const ADD_TASK_REJECTED = 'containers/tasks/ADD_TASK_REJECTED';
export const ADD_TASK_FULFILLED = 'containers/tasks/ADD_TASK_FULFILLED';

export const UPDATE_TASK = 'containers/tasks/UPDATE_TASK';
export const UPDATE_TASK_PENDING = 'containers/tasks/UPDATE_TASK_PENDING';
export const UPDATE_TASK_REJECTED = 'containers/tasks/UPDATE_TASK_REJECTED';
export const UPDATE_TASK_FULFILLED = 'containers/tasks/UPDATE_TASK_FULFILLED';

export const UPDATE_TASKS = 'containers/tasks/UPDATE_TASKS';
export const UPDATE_TASKS_PENDING = 'containers/tasks/UPDATE_TASKS_PENDING';
export const UPDATE_TASKS_REJECTED = 'containers/tasks/UPDATE_TASKS_REJECTED';
export const UPDATE_TASKS_FULFILLED = 'containers/tasks/UPDATE_TASKS_FULFILLED';

export const DELETE_TASKS = 'containers/tasks/DELETE_TASKS';
export const DELETE_TASKS_PENDING = 'containers/tasks/DELETE_TASKS_PENDING';
export const DELETE_TASKS_REJECTED = 'containers/tasks/DELETE_TASKS_REJECTED';
export const DELETE_TASKS_FULFILLED = 'containers/tasks/DELETE_TASKS_FULFILLED';

const persistedState = loadState();

if (persistedState) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${loadState().loginReducer.token}`;
}

export const addTask = (data) => {
    return {
        type: ADD_TASK,
        payload: axios.post('http://localhost:3000/task/', data)
    }
};

export const updateTask = (id, data) => {
    return {
        type: UPDATE_TASK,
        payload: axios.patch(`http://localhost:3000/task/${id}`, data)
    }
};

export const updateTasks = (data) => {
    return {
        type: UPDATE_TASKS,
        payload: axios.put('http://localhost:3000/task/', data)
    }
};

export const deleteTasks = (data) => {
    return {
        type: DELETE_TASKS,
        payload: axios.delete('http://localhost:3000/task/', {data})
    }
};

export const getTasks = () => {
    return {
        type: GET_TASKS,
        payload: axios.get('http://localhost:3000/task/', {
            headers: {
                Authorization: `Bearer ${loadState().loginReducer.token}`
            }
        })
    }
};