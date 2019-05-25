import { GET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from './Types';

export const getAllTasks = () => ({
    type: GET_TASKS
})

export const addTask = (task) => ({
    type: ADD_TASK,
    task
})

export const updateTask = (task) => ({
    type: UPDATE_TASK,
    task
})

export const deleteTask = (task) => ({
    type: DELETE_TASK,
    task
})