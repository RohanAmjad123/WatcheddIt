import { User } from '../../interfaces/index'

export function addVote (vote: User["votes"][0]) {
    return {
        type: 'user/addVote',
        payload: vote
    }
}