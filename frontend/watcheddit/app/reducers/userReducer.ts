import { AnyAction } from 'redux'

const initialUserState = {
    loggedIn: false,
    username: "",
    type: ""
}

export function userReducer (state = initialUserState, action: AnyAction) {
    if (action.type === 'user/logoutUser') {
        return {
            ...state,
            loggedIn: false,
            username: "",
            userType: "",
        }
    }
    else if (action.type === 'user/loginUser') {
        return {
            ...state,
            loggedIn: true,
            username: action.payload.username,
            type: action.payload.type
        }
    }
    return state
}