import axios from 'axios';

export const GET_TASKS = 'containers/tasks/GET_TASKS';
export const GET_TASKS_PENDING = 'containers/tasks/GET_TASKS_PENDING';
export const GET_TASKS_REJECTED = 'containers/tasks/GET_TASKS_REJECTED';
export const GET_TASKS_FULFILLED = 'containers/tasks/GET_TASKS_FULFILLED';


export const UPDATE_TASKS = 'containers/tasks/UPDATE_TASKS';
export const UPDATE_TASKS_PENDING = 'containers/tasks/UPDATE_TASKS_PENDING';
export const UPDATE_TASKS_REJECTED = 'containers/tasks/UPDATE_TASKS_REJECTED';
export const UPDATE_TASKS_FULFILLED = 'containers/tasks/UPDATE_TASKS_FULFILLED';

export const getTasks = (token) => {
    console.log({
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return {
        type: GET_TASKS,
        payload: axios.get('http://localhost:3000/task/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};

export const updateTasks = (data, token) => {
    console.log(token)
    return {
        type: UPDATE_TASKS,
        payload: axios.put('http://localhost:3000/task/', {tasks: data}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};