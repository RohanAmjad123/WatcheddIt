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
    ],
    votes: [
        {
            postID: "",
            vote: true
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
            ratings: action.payload.ratings,
            votes: action.payload.votes
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
    else if (action.type === 'user/addVote') {
        return {
            ...state,
            votes: [
                ...state.votes,
                action.payload
            ]
        }
    }  
    else if (action.type === 'user/updateVote') {
        return {
            ...state,
            votes: state.votes.map((v) => {
                return v.postID == action.payload.postID ? {...v, vote: action.payload.vote} : v
            })
        }
    }
    else if (action.type === 'user/deleteVote') {
        return {
            ...state,
            votes: state.votes.filter((v) => {
                v.postID !== action.payload.postID
            })
        }
    }  
    return state
}