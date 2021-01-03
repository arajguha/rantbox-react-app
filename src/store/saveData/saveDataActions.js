import actions from './saveDataActionTypes'
import axios from 'axios'

export const saveData = (postData, token) => {
    return dispatch => {
        dispatch(saveDataRequest())
        axios
            .post('http://localhost:8000/rant-posts/', postData, {
                'headers': {'Authoriztion': `Token ${token}`}
            })
            .then(res => console.log(res))
            .catch(err => {
                dispatch(saveDataFailure(err))
                console.log(err)
            })
    }
}

export const saveDataRequest = () => {
    return {
        type: actions.SAVE_DATA_REQUEST
    }
}

export const saveDataSuccess = (res) => {
    return {
        type: actions.SAVE_DATA_SUCCESS,
        payload: res
    }
}

export const saveDataFailure = (error) => {
    return {
        type: actions.SAVE_DATA_FAILURE,
        payload: error
    }
}
