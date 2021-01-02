import actions from './postActionTypes'
import axios from 'axios'


export const fetchPosts = (token) => {
    return dispatch => {
        dispatch(fetchPostsRequest())
        axios
            .get('http://localhost:8000/rant-posts/', {
                'headers': { 'Authorization': `Token ${token}` }
            })
            .then(json => {
                console.log(json.data)
                dispatch(fetchPostsSuccess(json.data.results))
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchPostsFailure(err))
            })
    }
}

export const fetchPostsRequest = () => {
    return {
        type: actions.FETCH_POSTS_REQUEST
    }
}

export const fetchPostsSuccess = (posts) => {
    return {
        type: actions.FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

export const fetchPostsFailure = (error) => {
    return {
        type: actions.FETCH_POSTS_FAILURE,
        payload: error
    }
}

