import { User } from '../../interfaces/index'

export function updateRating (rating: User["ratings"][0]) {
    return {
        type: 'user/updateRating',
        payload: rating
    }
}