
const initialState = {
    loading: false,
    posts: [],
    error: ''
}

const postsReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                loading: True
            }

        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }

        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false, 
                error: action.payload
            }

        default:
            return initialState

    }
}
