import { User } from '../../interfaces/index'

export function updateVote (vote: User["votes"][0]) {
    return {
        type: 'user/updateVote',
        payload: vote
    }
}