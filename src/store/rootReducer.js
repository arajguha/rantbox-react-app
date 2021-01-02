import authReducer from './auth/authReducer'
import postReducer from './posts/postReducer'
import { combineReducers } from 'redux'


export default combineReducers({
    auth: authReducer,
    posts: postReducer
})