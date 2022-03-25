import { AnyAction } from 'redux'

const initialUserState = {
    loggedIn: false,
    username: "",
    type: "",
    ratings: [
        {
            imdbID: "",
            rating: 1
        }
    ]
}

export function userReducer(state = initialUserState, action: AnyAction) {
    if (action.type === 'user/logoutUser') {
        return {
            ...state,
            loggedIn: false,
            username: "",
            type: "",
            ratings: [
                {
                    imdbID: "",
                    rating: 1
                }
            ]
        }
    }
    else if (action.type === 'user/loginUser') {
        return {
            ...state,
            loggedIn: true,
            username: action.payload.username,
            type: action.payload.type,
            ratings: action.payload.ratings
        }
    }
    else if (action.type === 'user/addRating') {
        return {
            ...state,
            ratings: [
                ...state.ratings,
                action.payload
            ]
        }
    }
    else if (action.type === 'user/updateRating') {
        return {
            ...state,
            ratings: state.ratings.map((r) => {
                return r.imdbID == action.payload.imdbID ? {...r, rating: action.payload.rating} : r
            })
        }

    }
    return state
}