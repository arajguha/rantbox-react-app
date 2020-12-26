import actions from './postActionTypes'

const fetchPosts = () => {
    return {
        type: actions.FETCH_POSTS
    }
}

const fetchPostsSuccess = (posts) => {
    return {
        type: actions.FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

const fetchPostsFailure = (error) => {
    return {
        type: actions.FETCH_POSTS_FAILURE,
        payload: error
    }
}

