import { User } from '../../interfaces/index'

export function deleteVote (vote: User["votes"][0]) {
    return {
        type: 'user/deleteVote',
        payload: vote
    }
}