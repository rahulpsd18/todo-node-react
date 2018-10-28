import axios from 'axios';

export const LOGIN = 'containers/signup/LOGIN';
export const LOGIN_PENDING = 'containers/signup/LOGIN_PENDING';
export const LOGIN_REJECTED = 'containers/signup/LOGIN_REJECTED';
export const LOGIN_FULFILLED = 'containers/signup/LOGIN_FULFILLED';

export const login = (data) => {
  return {
    type: LOGIN,
    payload: axios.post('http://localhost:3000/auth/login', data)
  }
};
