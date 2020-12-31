import actions from './authActionTypes'
import axios from 'axios'


export const login = (userData) => {
    return dispatch => {
        axios.post('http://localhost:8000/login', userData)
            .then(data => dispatch(loginSuccess(data.token)))
            .catch(err => dispatch(loginError(err)))
    }
}

export const loginSuccess = (token) => {
    return {
        type: actions.LOGIN_SUCCESS,
        payload: token
    }
}

export const loginError = (error) => {
    return {
        type: actions.LOGIN_ERROR,
        payload: error
    }
}

export const logout = () => {
    return {
        type: actions.LOGOUT
    }
}
