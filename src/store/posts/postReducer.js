import actions from './postActionTypes'

const initialState = {
    loading: false,
    postsArray: [],
    error: ''
}

const postsReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.FETCH_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actions.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                postsArray: action.payload
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