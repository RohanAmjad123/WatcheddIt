import { User } from '../../interfaces/index'

export function addRating (rating: User["ratings"][0]) {
    return {
        type: 'user/addRating',
        payload: rating
    }
}