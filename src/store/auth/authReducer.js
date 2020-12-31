import actions from './authActionTypes'

const initialState = {
    loading: false,
    isLoggedIn: false,
    token: null,
    error: ''
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.LOGIN_SUCCESS:
            return {
                loading: false,
                isLoggedIn: true,
                token: action.payload,
                error: ''
            }

        case actions.LOGOUT:
            return {
                ...state,
                token: null,
                isLoggedIn: false
            }
        case actions.LOGIN_ERROR:
            return {
                loading: false,
                token: null,
                isLoggedIn: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default authReducer
