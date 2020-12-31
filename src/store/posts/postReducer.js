import actions from './postActionTypes'

const initialState = {
    loading: false,
    posts: [],
    error: ''
}

const postsReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.FETCH_POSTS:
            return {
                ...state,
                loading: True
            }

        case actions.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }

        case actions.FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false, 
                error: action.payload
            }

        default:
            return initialState

    }
}

export default postsReducer