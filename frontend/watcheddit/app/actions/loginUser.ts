import { User } from '../../interfaces/index'

export function loginUser (user: User) {
    return {
        type: "user/loginUser",
        payload: user
    }
}