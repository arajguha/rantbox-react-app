import actions from './authActionTypes'
import axios from 'axios'


export const login = (userData) => {
    return dispatch => {
        dispatch(loginRequest())
        
        axios.post('http://localhost:8000/login', userData)
            .then(json => dispatch(loginSuccess(json.data.token)))
            .catch(err =>{ 
                dispatch(loginError(err.response.data.non_field_errors))
                //console.log(err.response.data.non_field_errors)
            })
            .catch(err => dispatch(loginError('some error occured while logging in')))
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

export const clearError = () => {
    return {
        type: actions.CLEAR_ERROR
    }
}
