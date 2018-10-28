import axios from 'axios';

export const SIGNUP = 'containers/signup/SIGNUP';
export const SIGNUP_PENDING = 'containers/signup/SIGNUP_PENDING';
export const SIGNUP_REJECTED = 'containers/signup/SIGNUP_REJECTED';
export const SIGNUP_FULFILLED = 'containers/signup/SIGNUP_FULFILLED';

export const signup = (data) => {
  return {
    type: SIGNUP,
    payload: axios.post('http://localhost:3000/auth/signup', data)
  }
};
