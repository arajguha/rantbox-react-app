import authReducer from './auth/authReducer'
import { combineReducers } from 'redux'


export default combineReducers({
    auth: authReducer
})