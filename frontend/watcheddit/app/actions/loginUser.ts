interface UserData {
    username: string,
    type: string
}

export function loginUser (userData: UserData) {
    return {
        type: "user/loginUser",
        payload: userData
    }
}