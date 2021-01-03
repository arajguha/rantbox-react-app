import actions from './postActionTypes'
import axios from 'axios'


export const fetchPosts = (token, link=null) => {
    return dispatch => {
        dispatch(fetchPostsRequest())
        const url = link ? link : 'http://localhost:8000/rant-posts/'
        axios
            .get(url, {
                'headers': { 'Authorization': `Token ${token}` }
            })
            .then(json => {
                console.log('postActions', json.data)
                dispatch(fetchPostsSuccess(json.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchPostsFailure(err))
            })
            .catch(() => dispatch(fetchPostsFailure('some error occured')))
    }
}

export const fetchPostsRequest = () => {
    return {
        type: actions.FETCH_POSTS_REQUEST
    }
}

export const fetchPostsSuccess = (response) => {
    return {
        type: actions.FETCH_POSTS_SUCCESS,
        payload: response
    }
}

export const fetchPostsFailure = (error) => {
    return {
        type: actions.FETCH_POSTS_FAILURE,
        payload: error
    }
}

