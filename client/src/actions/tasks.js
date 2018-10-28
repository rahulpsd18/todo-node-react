import axios from 'axios';

export const GET_TASKS = 'containers/tasks/GET_TASKS';
export const GET_TASKS_PENDING = 'containers/tasks/GET_TASKS_PENDING';
export const GET_TASKS_REJECTED = 'containers/tasks/GET_TASKS_REJECTED';
export const GET_TASKS_FULFILLED = 'containers/tasks/GET_TASKS_FULFILLED';

export const ADD_TASK = 'containers/tasks/ADD_TASK';
export const ADD_TASK_PENDING = 'containers/tasks/ADD_TASK_PENDING';
export const ADD_TASK_REJECTED = 'containers/tasks/ADD_TASK_REJECTED';
export const ADD_TASK_FULFILLED = 'containers/tasks/ADD_TASK_FULFILLED';

export const UPDATE_TASKS = 'containers/tasks/UPDATE_TASKS';
export const UPDATE_TASKS_PENDING = 'containers/tasks/UPDATE_TASKS_PENDING';
export const UPDATE_TASKS_REJECTED = 'containers/tasks/UPDATE_TASKS_REJECTED';
export const UPDATE_TASKS_FULFILLED = 'containers/tasks/UPDATE_TASKS_FULFILLED';

export const getTasks = (token) => {
    return {
        type: GET_TASKS,
        payload: axios.get('http://localhost:3000/task/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};

export const addTask = (data, token) => {
    return {
        type: ADD_TASK,
        payload: axios.post('http://localhost:3000/task/', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};

export const updateTasks = (data, token) => {
    return {
        type: UPDATE_TASKS,
        payload: axios.put('http://localhost:3000/task/', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};