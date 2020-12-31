import actions from './authActionTypes'
import axios from 'axios'


export const login = (userData) => {
    return dispatch => {
        dispatch(loginRequest())
        
        axios.post('http://localhost:8000/login', userData)
            .then(json => dispatch(loginSuccess(json.data.token)))
            .catch(err => dispatch(loginError(err.message)))
    }
}

export const loginRequest = () => {
    return {
        type: actions.LOGIN_REQUEST
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
