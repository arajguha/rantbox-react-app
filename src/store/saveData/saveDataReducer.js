import actions from './saveDataActionTypes'

const initialState = {
    loading: false,
    response: {},
    error: ''
}


const saveDataReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SAVE_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.SAVE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actions.SAVE_DATA_SUCCESS:
            return {
                loading: false,
                response: action.payload,
                error: ''
            }
        default:
            return state
    }

}

export default saveDataReducer