import { GET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../Actions/Types';

export const task = (state = {}, action) => {
    switch (action.type) {
        
        case GET_TASKS:
            return state

        case ADD_TASK:
            return state

        case UPDATE_TASK:
            return state

        case DELETE_TASK:
            return state

        default:
            return state
    }
}
